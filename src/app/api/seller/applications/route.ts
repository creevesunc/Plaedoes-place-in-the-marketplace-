import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { slugifyCategory } from "@/lib/catalog";

const sellerApplicationSchema = z.object({
  ownerId: z.string().uuid(),
  businessName: z.string().min(2).max(120),
  storeName: z.string().min(2).max(120),
  storeDescription: z.string().min(10).max(2000),
  businessType: z.string().min(2).max(80),
  shippingPolicy: z.string().max(1000).optional(),
  returnPolicy: z.string().max(1000).optional(),
  agreementAccepted: z.literal(true),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = sellerApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please complete all required seller application fields and accept the agreement." },
        { status: 400 }
      );
    }

    const input = parsed.data;
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const baseSlug = slugifyCategory(input.storeName) || "seller-store";
    const uniqueSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowIso = new Date().toISOString();

    const { data, error } = await supabase
      .from("seller_stores")
      .upsert(
        {
          owner_id: input.ownerId,
          business_name: input.businessName.trim(),
          store_name: input.storeName.trim(),
          slug: uniqueSlug,
          store_description: input.storeDescription.trim(),
          business_type: input.businessType.trim(),
          shipping_policy: input.shippingPolicy?.trim() ?? null,
          return_policy: input.returnPolicy?.trim() ?? null,
          agreement_accepted_at: nowIso,
          status: "APPLICATION_PENDING",
          updated_at: nowIso,
        },
        { onConflict: "owner_id" }
      )
      .select("id, store_name, slug, status, created_at")
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Unable to submit seller application." },
        { status: 500 }
      );
    }

    await supabase
      .from("profiles")
      .update({ seller_status: "APPLICATION_PENDING", updated_at: nowIso })
      .eq("id", input.ownerId);

    return NextResponse.json({ application: data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to submit seller application.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
