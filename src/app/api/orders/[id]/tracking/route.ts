import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const trackingSchema = z.object({
  carrier: z.string().min(2).max(80),
  trackingNumber: z.string().min(4).max(120),
  markShipped: z.boolean().default(true),
});

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const parsed = trackingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid tracking payload.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const nowIso = new Date().toISOString();
    const updatePayload: Record<string, unknown> = {
      tracking_carrier: parsed.data.carrier.trim(),
      tracking_number: parsed.data.trackingNumber.trim(),
      updated_at: nowIso,
    };

    if (parsed.data.markShipped) {
      updatePayload.status = "SHIPPED";
      updatePayload.shipped_at = nowIso;
    }

    const { data, error } = await supabase
      .from("orders")
      .update(updatePayload)
      .eq("id", id)
      .select("id, order_number, status, tracking_carrier, tracking_number, shipped_at")
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Order not found or could not be updated." },
        { status: 404 }
      );
    }

    return NextResponse.json({ order: data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update tracking.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
