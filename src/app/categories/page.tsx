import Link from "next/link";
import { INITIAL_CATEGORIES, slugifyCategory } from "@/lib/catalog";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function CategoriesDirectoryPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-base font-bold text-slate-900">
            Plaedoe&apos;s Place in the Market
          </Link>
          <Link href="/shop" className="text-sm font-semibold text-emerald-700 hover:underline">
            Shop All
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
          Marketplace Category Directory
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Browse all {INITIAL_CATEGORIES.length} core departments across Plaedoe&apos;s Place in the Market.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {INITIAL_CATEGORIES.map((category, idx) => {
            const slug = slugifyCategory(category);
            return (
              <Link
                key={slug}
                href={`/shop?category=${encodeURIComponent(slug)}`}
                className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-emerald-600"
              >
                <span className="text-xs font-semibold text-emerald-700">
                  #{String(idx + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-1 text-base font-bold text-slate-900">{category}</h2>
                <p className="mt-1 text-xs text-slate-500">Explore {category} listings →</p>
              </Link>
            );
          })}
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
