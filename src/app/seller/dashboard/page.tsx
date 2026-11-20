import Link from "next/link";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { calculateMarketplaceFees, formatCentsToUsd } from "@/lib/fees";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function SellerDashboardPage() {
  const sampleOrderCents = 10000;
  const sampleFees = calculateMarketplaceFees(sampleOrderCents);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-base font-bold text-slate-900">
            Plaedoe&apos;s Place in the Market
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/seller/apply" className="hover:text-emerald-700">Apply / Store Setup</Link>
            <Link href="/admin" className="hover:text-emerald-700">Admin Console</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
              Status: APPLICATION_PENDING / APPROVED
            </span>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
              Seller Storefront &amp; Payout Dashboard
            </h1>
            <p className="text-sm text-slate-600">
              Manage listings, fulfillment tracking, Stripe Connect onboarding, and fee breakdowns.
            </p>
          </div>
          <Link
            href="/seller/apply"
            className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Connect Stripe &amp; Edit Store
          </Link>
        </div>

        {/* Metrics Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Example $100 Order Proceeds</p>
            <p className="mt-1 text-2xl font-extrabold text-emerald-700">
              {formatCentsToUsd(sampleFees.sellerProceedsCents)}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Commission (5%) + Insurance (5%)</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              {formatCentsToUsd(sampleFees.totalMarketplaceFeesCents)}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Active Catalog Listings</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">{CATALOG_ITEMS.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium text-slate-500">Payout Protection Window</p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">7 Days Post-Delivery</p>
          </div>
        </div>

        {/* Listings Table */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Seller Inventory &amp; Pricing</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <th className="py-2.5 pr-4">SKU</th>
                  <th className="py-2.5 pr-4">Product</th>
                  <th className="py-2.5 pr-4">Stock</th>
                  <th className="py-2.5 pr-4">Price</th>
                  <th className="py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CATALOG_ITEMS.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 pr-4 font-mono text-xs">{item.sku}</td>
                    <td className="py-3 pr-4 font-semibold text-slate-900">{item.title}</td>
                    <td className="py-3 pr-4">{item.stockQuantity}</td>
                    <td className="py-3 pr-4">
                      {formatCentsToUsd(item.salePriceCents ?? item.priceCents)}
                    </td>
                    <td className="py-3">
                      <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800">
                        PUBLISHED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
