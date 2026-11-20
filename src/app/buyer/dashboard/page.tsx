import Link from "next/link";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function BuyerDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-base font-bold text-slate-900">
            Plaedoe&apos;s Place in the Market
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/shop" className="hover:text-emerald-700">Shop All</Link>
            <Link href="/buyer/orders" className="hover:text-emerald-700">Orders &amp; Tracking</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
            Buyer Account Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage saved listings, shipping addresses, order history, messages, and disputes.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/buyer/orders"
            className="rounded-xl border border-slate-200 bg-white p-5 hover:border-emerald-600"
          >
            <p className="text-xs font-semibold text-emerald-700">Orders &amp; Tracking</p>
            <p className="mt-1 text-base font-bold text-slate-900">View Order History</p>
            <p className="mt-1 text-xs text-slate-500">Track shipments &amp; fee snapshots</p>
          </Link>

          <Link
            href="/buyer-protection"
            className="rounded-xl border border-slate-200 bg-white p-5 hover:border-emerald-600"
          >
            <p className="text-xs font-semibold text-emerald-700">Protection &amp; Disputes</p>
            <p className="mt-1 text-base font-bold text-slate-900">Buyer Protection</p>
            <p className="mt-1 text-xs text-slate-500">Review dispute holds &amp; refunds</p>
          </Link>

          <Link
            href="/shop"
            className="rounded-xl border border-slate-200 bg-white p-5 hover:border-emerald-600"
          >
            <p className="text-xs font-semibold text-emerald-700">Catalog</p>
            <p className="mt-1 text-base font-bold text-slate-900">Saved &amp; Wishlist Items</p>
            <p className="mt-1 text-xs text-slate-500">Browse independent storefronts</p>
          </Link>

          <Link
            href="/seller/apply"
            className="rounded-xl border border-slate-200 bg-white p-5 hover:border-emerald-600"
          >
            <p className="text-xs font-semibold text-emerald-700">Selling</p>
            <p className="mt-1 text-base font-bold text-slate-900">Open a Seller Store</p>
            <p className="mt-1 text-xs text-slate-500">Apply &amp; connect Stripe payouts</p>
          </Link>
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
