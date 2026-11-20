import Link from "next/link";
import { CATALOG_ITEMS, INITIAL_CATEGORIES, slugifyCategory } from "@/lib/catalog";
import { formatCentsToUsd } from "@/lib/fees";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

type ShopPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    condition?: string;
    sort?: string;
    maxPrice?: string;
  }>;
};

export default async function ShopAllPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const query = (params.q ?? "").trim().toLowerCase();
  const categoryFilter = (params.category ?? "").trim().toLowerCase();
  const conditionFilter = (params.condition ?? "").trim().toUpperCase();
  const sort = params.sort ?? "recommended";
  const maxPriceDollars = params.maxPrice ? Number(params.maxPrice) : null;

  let items = CATALOG_ITEMS.filter((item) => {
    const effectivePriceCents = item.salePriceCents ?? item.priceCents;

    if (query) {
      const hay = `${item.title} ${item.description} ${item.brand} ${item.sellerName} ${item.tags.join(" ")}`.toLowerCase();
      if (!hay.includes(query)) return false;
    }

    if (categoryFilter && categoryFilter !== "all" && item.categorySlug !== categoryFilter) {
      return false;
    }

    if (conditionFilter && conditionFilter !== "ALL" && item.condition !== conditionFilter) {
      return false;
    }

    if (maxPriceDollars && Number.isFinite(maxPriceDollars) && maxPriceDollars > 0) {
      if (effectivePriceCents > Math.round(maxPriceDollars * 100)) return false;
    }

    return true;
  });

  items = [...items].sort((a, b) => {
    const priceA = a.salePriceCents ?? a.priceCents;
    const priceB = b.salePriceCents ?? b.priceCents;
    switch (sort) {
      case "price-asc":
        return priceA - priceB;
      case "price-desc":
        return priceB - priceA;
      case "rating":
        return b.ratingAvg - a.ratingAvg;
      case "newest":
        return Number(Boolean(b.newArrival)) - Number(Boolean(a.newArrival));
      default:
        return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-base font-bold text-slate-900">
            Plaedoe&apos;s Place in the Market
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/categories" className="hover:text-emerald-700">Categories</Link>
            <Link href="/cart" className="rounded-lg bg-emerald-700 px-3.5 py-2 text-white">Cart</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
              Shop All Marketplace Items
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Showing {items.length} listing{items.length === 1 ? "" : "s"} across independent storefronts.
            </p>
          </div>
        </div>

        {/* Filters & Sorting */}
        <form
          method="GET"
          className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          <input
            type="search"
            name="q"
            defaultValue={params.q ?? ""}
            placeholder="Search keyword or seller..."
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />

          <select
            name="category"
            defaultValue={params.category ?? "all"}
            aria-label="Filter by category"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="all">All Categories</option>
            {INITIAL_CATEGORIES.map((cat) => {
              const slug = slugifyCategory(cat);
              return (
                <option key={slug} value={slug}>
                  {cat}
                </option>
              );
            })}
          </select>

          <select
            name="condition"
            defaultValue={params.condition ?? "ALL"}
            aria-label="Filter by condition"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="ALL">Any Condition</option>
            <option value="NEW">New</option>
            <option value="LIKE_NEW">Like New</option>
            <option value="GOOD">Good</option>
            <option value="REFURBISHED">Refurbished</option>
          </select>

          <select
            name="sort"
            defaultValue={sort}
            aria-label="Sort products"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="newest">Sort: Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Best Rated</option>
          </select>

          <button
            type="submit"
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Apply Filters
          </button>
        </form>

        {/* Results */}
        {items.length === 0 ? (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-10 text-center">
            <h2 className="text-lg font-bold text-slate-900">No matching listings found</h2>
            <p className="mt-1 text-sm text-slate-600">
              Try clearing your search filter or browsing all categories.
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Reset Filters
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product) => {
              const displayPrice = product.salePriceCents ?? product.priceCents;
              return (
                <article
                  key={product.id}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{product.categoryName}</span>
                      <span>★ {product.ratingAvg.toFixed(1)}</span>
                    </div>
                    <h2 className="mt-2 text-base font-bold text-slate-900">{product.title}</h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Store:{" "}
                      <Link
                        href={`/stores/${product.storeSlug}`}
                        className="font-medium text-emerald-700 hover:underline"
                      >
                        {product.sellerName}
                      </Link>
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <span className="text-lg font-bold text-slate-950">
                        {formatCentsToUsd(displayPrice)}
                      </span>
                      {product.salePriceCents && (
                        <span className="ml-2 text-xs text-slate-400 line-through">
                          {formatCentsToUsd(product.priceCents)}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                    >
                      Details
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <MarketplaceFooter />
    </div>
  );
}
