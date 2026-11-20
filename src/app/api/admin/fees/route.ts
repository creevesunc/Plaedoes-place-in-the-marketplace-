import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const updateFeesSchema = z.object({
  commissionRate: z.number().min(0).max(0.5),
  shippingHandlingInsuranceRate: z.number().min(0).max(0.5),
  payoutHoldDays: z.number().int().min(0).max(90).optional(),
  reason: z.string().min(3).max(300).optional(),
  actorId: z.string().uuid().optional(),
});

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("marketplace_fee_settings")
    .select("id, commission_rate, shipping_handling_insurance_rate, payout_hold_days, updated_at")
    .limit(1)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Fee configuration not found." }, { status: 404 });
  }

  return NextResponse.json({ settings: data });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = updateFeesSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid fee configuration payload.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { commissionRate, shippingHandlingInsuranceRate, payoutHoldDays, reason, actorId } =
      parsed.data;

    if (commissionRate + shippingHandlingInsuranceRate > 1) {
      return NextResponse.json(
        { error: "Combined marketplace fee rate cannot exceed 100%." },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: current, error: currentError } = await supabase
      .from("marketplace_fee_settings")
      .select("id, commission_rate, shipping_handling_insurance_rate, payout_hold_days")
      .limit(1)
      .single();

    if (currentError || !current) {
      return NextResponse.json({ error: "Current fee settings missing." }, { status: 404 });
    }

    const { data: updated, error: updateError } = await supabase
      .from("marketplace_fee_settings")
      .update({
        commission_rate: commissionRate,
        shipping_handling_insurance_rate: shippingHandlingInsuranceRate,
        payout_hold_days: payoutHoldDays ?? current.payout_hold_days,
        updated_by: actorId ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", current.id)
      .select("id, commission_rate, shipping_handling_insurance_rate, payout_hold_days, updated_at")
      .single();

    if (updateError || !updated) {
      return NextResponse.json({ error: "Failed to update fee settings." }, { status: 500 });
    }

    await supabase.from("marketplace_fee_logs").insert({
      changed_by: actorId ?? null,
      previous_commission_rate: current.commission_rate,
      new_commission_rate: commissionRate,
      previous_insurance_rate: current.shipping_handling_insurance_rate,
      new_insurance_rate: shippingHandlingInsuranceRate,
      reason: reason ?? "Administrator fee configuration update",
    });

    return NextResponse.json({ settings: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected fee update error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
