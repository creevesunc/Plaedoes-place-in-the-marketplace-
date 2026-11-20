import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const createDisputeSchema = z.object({
  orderId: z.string().uuid(),
  openedBy: z.string().uuid(),
  reason: z.string().min(3).max(120),
  description: z.string().min(10).max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createDisputeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid dispute submission.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { orderId, openedBy, reason, description } = parsed.data;
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, order_number, status, payout_status")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const { data: dispute, error: disputeError } = await supabase
      .from("disputes")
      .insert({
        order_id: order.id,
        opened_by: openedBy,
        reason: reason.trim(),
        description: description.trim(),
        status: "OPEN",
      })
      .select("id, order_id, reason, status, created_at")
      .single();

    if (disputeError || !dispute) {
      return NextResponse.json({ error: "Failed to open dispute." }, { status: 500 });
    }

    const nowIso = new Date().toISOString();

    await supabase
      .from("orders")
      .update({
        status: "DISPUTED",
        payout_status: "DISPUTE_HOLD",
        updated_at: nowIso,
      })
      .eq("id", order.id);

    await supabase.from("audit_logs").insert({
      actor_id: openedBy,
      action: "ORDER_DISPUTE_OPENED",
      entity_type: "order",
      entity_id: order.id,
      metadata: {
        dispute_id: dispute.id,
        order_number: order.order_number,
        reason: reason.trim(),
        payout_hold_applied: true,
      },
    });

    return NextResponse.json(
      {
        dispute,
        orderStatus: "DISPUTED",
        payoutStatus: "DISPUTE_HOLD",
      },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to process dispute.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
