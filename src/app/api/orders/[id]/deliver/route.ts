import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    const [{ data: order }, { data: feeSettings }] = await Promise.all([
      supabase
        .from("orders")
        .select("id, order_number, status, tracking_number, delivered_at")
        .eq("id", id)
        .single(),
      supabase
        .from("marketplace_fee_settings")
        .select("payout_hold_days")
        .limit(1)
        .single(),
    ]);

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    if (order.status === "DISPUTED") {
      return NextResponse.json(
        { error: "Cannot mark disputed order as completed while dispute hold is active." },
        { status: 409 }
      );
    }

    const deliveredAt = order.delivered_at ? new Date(order.delivered_at) : new Date();
    const holdDays = Number(feeSettings?.payout_hold_days ?? 7);
    const payoutEligibleAt = new Date(
      deliveredAt.getTime() + holdDays * 24 * 60 * 60 * 1000
    );

    const { data: updated, error } = await supabase
      .from("orders")
      .update({
        status: "DELIVERED",
        delivered_at: deliveredAt.toISOString(),
        payout_eligible_at: payoutEligibleAt.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", order.id)
      .select("id, order_number, status, delivered_at, payout_eligible_at, payout_status")
      .single();

    if (error || !updated) {
      return NextResponse.json({ error: "Failed to record delivery." }, { status: 500 });
    }

    return NextResponse.json({ order: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delivery confirmation error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
