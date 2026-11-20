import Link from "next/link";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { calculateMarketplaceFees, formatCentsToUsd } from "@/lib/fees";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function ShoppingCartPage() {
  const sampleItem = CATALOG_ITEMS[0];
  const unitPriceCents = sampleItem.salePriceCents ?? sampleItem.priceCents;
  const quantity = 1;
  const merchandiseSubtotalCents = unitPriceCents * quantity;
  const fees = calculateMarketplaceFees(merchandiseSubtotalCents);
  const shippingCostCents = sampleItem.shippingCostCents;
  const estimatedTaxCents = Math.round(merchandiseSubtotalCents * 0.053);
  const totalCents = merchandiseSubtotalCents + shippingCostCents + estimatedTaxCents;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-base font-bold text-slate-900">
            Plaedoe&apos;s Place in the Market
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/shop" className="hover:text-emerald-700">Shop All</Link>
            <Link href="/checkout" className="rounded-lg bg-emerald-700 px-3.5 py-2 text-white">
              Checkout
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Review items, variants, shipping, and separate 5% + 5% marketplace fees before
            checking out.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <section className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Cart Items (1)</h2>
            <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div>
                <p className="text-xs font-semibold text-emerald-700">{sampleItem.sellerName}</p>
                <Link
                  href={`/products/${sampleItem.slug}`}
                  className="text-base font-bold text-slate-900 hover:underline"
                >
                  {sampleItem.title}
                </Link>
                <p className="mt-1 text-xs text-slate-500">
                  SKU: {sampleItem.sku} • Qty: {quantity} • Variant:{" "}
                  {sampleItem.variants.colors[0] ?? "Standard"}
                </p>
              </div>
              <p className="text-base font-bold text-slate-950">
                {formatCentsToUsd(merchandiseSubtotalCents)}
              </p>
            </div>
          </section>

          <aside className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-600">Merchandise Subtotal</dt>
                <dd className="font-semibold">{formatCentsToUsd(merchandiseSubtotalCents)}</dd>
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
                <dd>{formatCentsToUsd(shippingCostCents)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Estimated Tax</dt>
                <dd>{formatCentsToUsd(estimatedTaxCents)}</dd>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-extrabold text-slate-950">
                <dt>Estimated Total</dt>
                <dd>{formatCentsToUsd(totalCents)}</dd>
              </div>
            </dl>

            <Link
              href={`/checkout?product=${sampleItem.slug}`}
              className="block w-full rounded-lg bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
