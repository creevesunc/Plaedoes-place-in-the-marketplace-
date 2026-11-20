import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { calculateMarketplaceFees } from "@/lib/fees";
import { stripe } from "@/lib/stripe";

const checkoutItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(50),
});

const checkoutSchema = z.object({
  buyerId: z.string().uuid().optional(),
  items: z.array(checkoutItemSchema).min(1),
  shippingCostCents: z.number().int().min(0).default(0),
  taxCents: z.number().int().min(0).default(0),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid checkout request.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const productIds = parsed.data.items.map((i) => i.productId);
    const { data: products, error: prodError } = await supabase
      .from("products")
      .select("id, title, price_cents, sale_price_cents, stock_quantity, store_id, status")
      .in("id", productIds);

    if (prodError || !products || products.length === 0) {
      return NextResponse.json({ error: "Products could not be verified." }, { status: 400 });
    }

    let merchandiseSubtotalCents = 0;
    const lineItems: Array<{
      price_data: {
        currency: "usd";
        product_data: { name: string };
        unit_amount: number;
      };
      quantity: number;
    }> = [];

    for (const item of parsed.data.items) {
      const dbProduct = products.find((p) => p.id === item.productId);
      if (!dbProduct || dbProduct.status !== "PUBLISHED") {
        return NextResponse.json(
          { error: `Product ${item.productId} is unavailable.` },
          { status: 400 }
        );
      }
      if (dbProduct.stock_quantity < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${dbProduct.title}.` },
          { status: 409 }
        );
      }

      const unitPriceCents = Number(dbProduct.sale_price_cents ?? dbProduct.price_cents);
      merchandiseSubtotalCents += unitPriceCents * item.quantity;

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: dbProduct.title },
          unit_amount: unitPriceCents,
        },
        quantity: item.quantity,
      });
    }

    const { data: feeSettings } = await supabase
      .from("marketplace_fee_settings")
      .select("commission_rate, shipping_handling_insurance_rate")
      .limit(1)
      .single();

    const commissionRate = Number(feeSettings?.commission_rate ?? 0.05);
    const insuranceRate = Number(feeSettings?.shipping_handling_insurance_rate ?? 0.05);

    const fees = calculateMarketplaceFees(
      merchandiseSubtotalCents,
      commissionRate,
      insuranceRate
    );

    if (parsed.data.shippingCostCents > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Shipping & Handling" },
          unit_amount: parsed.data.shippingCostCents,
        },
        quantity: 1,
      });
    }

    if (parsed.data.taxCents > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Estimated Tax" },
          unit_amount: parsed.data.taxCents,
        },
        quantity: 1,
      });
    }

    const totalChargedCents =
      merchandiseSubtotalCents + parsed.data.shippingCostCents + parsed.data.taxCents;
    const orderNumber = `PL-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const primaryStoreId = products[0].store_id;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        buyer_id: parsed.data.buyerId ?? null,
        store_id: primaryStoreId,
        status: "PENDING_PAYMENT",
        payout_status: "HELD",
        merchandise_subtotal_cents: fees.merchandiseSubtotalCents,
        marketplace_commission_cents: fees.marketplaceCommissionCents,
        shipping_handling_insurance_cents: fees.shippingHandlingInsuranceCents,
        total_marketplace_fees_cents: fees.totalMarketplaceFeesCents,
        seller_proceeds_cents: fees.sellerProceedsCents,
        shipping_cost_cents: parsed.data.shippingCostCents,
        tax_cents: parsed.data.taxCents,
        total_charged_cents: totalChargedCents,
        fee_rate_commission_snapshot: commissionRate,
        fee_rate_insurance_snapshot: insuranceRate,
      })
      .select("id, order_number, total_charged_cents, status, payout_status")
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Failed to create order record." }, { status: 500 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: parsed.data.successUrl ?? `${baseUrl}/buyer/orders?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: parsed.data.cancelUrl ?? `${baseUrl}/checkout?canceled=1`,
      metadata: {
        order_id: order.id,
        order_number: order.order_number,
        store_id: primaryStoreId,
        marketplace_commission_cents: String(fees.marketplaceCommissionCents),
        shipping_handling_insurance_cents: String(fees.shippingHandlingInsuranceCents),
        seller_proceeds_cents: String(fees.sellerProceedsCents),
      },
    });

    await supabase
      .from("orders")
      .update({ stripe_checkout_session_id: session.id })
      .eq("id", order.id);

    return NextResponse.json({
      order,
      checkoutUrl: session.url,
      sessionId: session.id,
      fees,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout session creation failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
