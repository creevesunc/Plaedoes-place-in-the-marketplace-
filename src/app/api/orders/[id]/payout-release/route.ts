import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { evaluatePayoutEligibility } from "@/lib/payout-eligibility";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select(
        "id, order_number, status, payout_status, seller_proceeds_cents, tracking_number, delivered_at, store_id"
      )
      .eq("id", id)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const [{ data: store }, { data: feeSettings }, { data: openDisputes }] = await Promise.all([
      supabase
        .from("seller_stores")
        .select("id, stripe_account_id, stripe_charges_enabled, stripe_payouts_enabled")
        .eq("id", order.store_id)
        .single(),
      supabase
        .from("marketplace_fee_settings")
        .select("payout_hold_days")
        .limit(1)
        .single(),
      supabase
        .from("disputes")
        .select("id")
        .eq("order_id", order.id)
        .eq("status", "OPEN"),
    ]);

    const eligibility = evaluatePayoutEligibility({
      orderStatus: order.status,
      hasOpenDispute: Boolean(openDisputes && openDisputes.length > 0),
      sellerChargesEnabled: Boolean(store?.stripe_charges_enabled),
      sellerPayoutsEnabled: Boolean(store?.stripe_payouts_enabled),
      trackingProvided: Boolean(order.tracking_number),
      deliveredAt: order.delivered_at ? new Date(order.delivered_at) : null,
      payoutHoldDays: Number(feeSettings?.payout_hold_days ?? 7),
    });

    if (!eligibility.eligible) {
      const nextPayoutStatus =
        order.status === "DISPUTED" || (openDisputes && openDisputes.length > 0)
          ? "DISPUTE_HOLD"
          : "HELD";

      await supabase
        .from("orders")
        .update({ payout_status: nextPayoutStatus, updated_at: new Date().toISOString() })
        .eq("id", order.id);

      return NextResponse.json(
        {
          eligible: false,
          payoutStatus: nextPayoutStatus,
          reason: eligibility.reason,
        },
        { status: 409 }
      );
    }

    await supabase
      .from("orders")
      .update({
        payout_status: "ELIGIBLE",
        updated_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    return NextResponse.json({
      eligible: true,
      payoutStatus: "ELIGIBLE",
      sellerProceedsCents: order.seller_proceeds_cents,
      reason: eligibility.reason,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to evaluate payout eligibility.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
