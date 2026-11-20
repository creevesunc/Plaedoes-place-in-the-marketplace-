import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { stripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  try {
    const storeId = req.nextUrl.searchParams.get("storeId");
    if (!storeId) {
      return NextResponse.json({ error: "Missing storeId query parameter." }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: store, error } = await supabase
      .from("seller_stores")
      .select(
        "id, store_name, status, stripe_account_id, stripe_charges_enabled, stripe_payouts_enabled, stripe_details_submitted"
      )
      .eq("id", storeId)
      .single();

    if (error || !store) {
      return NextResponse.json({ error: "Seller store not found." }, { status: 404 });
    }

    if (!store.stripe_account_id) {
      return NextResponse.json({
        storeId: store.id,
        storeStatus: store.status,
        connected: false,
        chargesEnabled: false,
        payoutsEnabled: false,
        detailsSubmitted: false,
        payoutEligible: false,
      });
    }

    const account = await stripe.accounts.retrieve(store.stripe_account_id);
    const chargesEnabled = Boolean(account.charges_enabled);
    const payoutsEnabled = Boolean(account.payouts_enabled);
    const detailsSubmitted = Boolean(account.details_submitted);

    await supabase
      .from("seller_stores")
      .update({
        stripe_charges_enabled: chargesEnabled,
        stripe_payouts_enabled: payoutsEnabled,
        stripe_details_submitted: detailsSubmitted,
        updated_at: new Date().toISOString(),
      })
      .eq("id", store.id);

    return NextResponse.json({
      storeId: store.id,
      storeStatus: store.status,
      stripeAccountId: store.stripe_account_id,
      connected: true,
      chargesEnabled,
      payoutsEnabled,
      detailsSubmitted,
      payoutEligible: store.status === "APPROVED" && chargesEnabled && payoutsEnabled,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to check Stripe Connect status.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
