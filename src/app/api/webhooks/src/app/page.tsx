import Link from "next/link";
import { CATALOG_ITEMS, INITIAL_CATEGORIES, slugifyCategory } from "@/lib/catalog";
import { formatCentsToUsd } from "@/lib/fees";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function MarketplaceHomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-slate-950">
            Plaedoe&apos;s Place in the Market
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <Link href="/shop" className="hover:text-emerald-700">Shop All</Link>
            <Link href="/categories" className="hover:text-emerald-700">Categories</Link>
            <Link href="/seller/apply" className="hover:text-emerald-700">Sell</Link>
            <Link href="/buyer/orders" className="hover:text-emerald-700">Orders</Link>
            <Link href="/auth/login" className="rounded-lg bg-slate-900 px-3.5 py-2 text-white">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 space-y-12">
        <section className="rounded-2xl border border-slate-200 bg-white p-8">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
            Multi-Vendor Marketplace • 5% Commission + 5% Shipping &amp; Handling Insurance
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-950">
            Independent storefronts, clear pricing, and buyer-protected checkout.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Discover goods across {INITIAL_CATEGORIES.length} departments, open your own seller
            storefront, and track orders from payment confirmation to delivery.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Explore Marketplace
            </Link>
            <Link
              href="/seller/apply"
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Open a Storefront
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-950">Featured Listings</h2>
            <Link href="/shop" className="text-sm font-semibold text-emerald-700 hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CATALOG_ITEMS.map((item) => (
              <article
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
              >
                <div>
                  <p className="text-xs font-medium text-slate-500">{item.categoryName}</p>
                  <h3 className="mt-1 text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">By {item.sellerName}</p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-base font-extrabold text-slate-950">
                    {formatCentsToUsd(item.salePriceCents ?? item.priceCents)}
                  </span>
                  <Link
                    href={`/products/${item.slug}`}
                    className="text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    View →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-950">Browse Departments</h2>
            <Link href="/categories" className="text-sm font-semibold text-emerald-700 hover:underline">
              All {INITIAL_CATEGORIES.length} categories →
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {INITIAL_CATEGORIES.slice(0, 10).map((cat) => (
              <Link
                key={cat}
                href={`/shop?category=${encodeURIComponent(slugifyCategory(cat))}`}
                className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:border-emerald-600 hover:text-emerald-800"
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
