import Link from "next/link";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { calculateMarketplaceFees, formatCentsToUsd } from "@/lib/fees";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

type CheckoutPageProps = {
  searchParams: Promise<{ product?: string }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { product: productSlug } = await searchParams;
  const selectedProduct =
    CATALOG_ITEMS.find((item) => item.slug === productSlug) ?? CATALOG_ITEMS[0];

  const unitPriceCents = selectedProduct.salePriceCents ?? selectedProduct.priceCents;
  const quantity = 1;
  const subtotalCents = unitPriceCents * quantity;
  const fees = calculateMarketplaceFees(subtotalCents);
  const shippingCents = selectedProduct.shippingCostCents;
  const estimatedTaxCents = Math.round(subtotalCents * 0.053);
  const totalChargedCents = subtotalCents + shippingCents + estimatedTaxCents;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-base font-bold text-slate-900">
            Plaedoe&apos;s Place in the Market
          </Link>
          <Link href="/shop" className="text-sm font-semibold text-emerald-700 hover:underline">
            Back to Shop
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
          Checkout &amp; Order Summary
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Review itemized merchandise, shipping, taxes, and separate 5% + 5% marketplace fees
          before initiating Stripe payment.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <section className="lg:col-span-7 space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">1. Cart Item &amp; Storefront</h2>
              <div className="mt-4 flex items-start justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div>
                  <p className="text-xs font-semibold text-emerald-700">
                    Store: {selectedProduct.sellerName}
                  </p>
                  <p className="text-base font-bold text-slate-900">{selectedProduct.title}</p>
                  <p className="text-xs text-slate-500">
                    SKU: {selectedProduct.sku} • Qty: {quantity} • Condition:{" "}
                    {selectedProduct.condition.replace("_", " ")}
                  </p>
                </div>
                <p className="text-base font-bold text-slate-900">
                  {formatCentsToUsd(subtotalCents)}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600">
                  Shipping Recipient &amp; Address
                </label>
                <div className="mt-2 rounded-xl border border-slate-200 p-3.5 text-sm text-slate-700">
                  Select or add a verified shipping address in Buyer Profile / Checkout API.
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600">
                  Billing Address &amp; Payment
                </label>
                <div className="mt-2 rounded-xl border border-slate-200 p-3.5 text-sm text-slate-700">
                  Processed securely via Stripe Checkout (Test Mode in development).
                </div>
              </div>
            </div>
          </section>

          <aside className="lg:col-span-5 space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">2. Complete Order Totals</h2>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-600">Merchandise Subtotal</dt>
                <dd className="font-semibold">{formatCentsToUsd(subtotalCents)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Marketplace Commission (5%)</dt>
                <dd>{formatCentsToUsd(fees.marketplaceCommissionCents)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Shipping &amp; Handling Insurance (5%)</dt>
                <dd>{formatCentsToUsd(fees.shippingHandlingInsuranceCents)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Shipping Cost</dt>
                <dd>{formatCentsToUsd(shippingCents)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Estimated Tax</dt>
                <dd>{formatCentsToUsd(estimatedTaxCents)}</dd>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2.5 text-xs text-emerald-800">
                <dt>Seller Merchandise Proceeds (after 5% + 5%)</dt>
                <dd className="font-semibold">{formatCentsToUsd(fees.sellerProceedsCents)}</dd>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-extrabold text-slate-950">
                <dt>Total</dt>
                <dd>{formatCentsToUsd(totalChargedCents)}</dd>
              </div>
            </dl>

            <p className="text-xs text-slate-500">
              All prices, quantities, stock availability, and fee calculations are verified
              server-side via <code className="font-mono">/api/checkout</code>.
            </p>

            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                href="/buyer/orders"
                className="w-full rounded-lg bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Continue to Order History &amp; Tracking
              </Link>
              <Link
                href={`/products/${selectedProduct.slug}`}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-center text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Return to Product
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
