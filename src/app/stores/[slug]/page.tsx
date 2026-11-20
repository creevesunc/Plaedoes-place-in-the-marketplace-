import Link from "next/link";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { formatCentsToUsd } from "@/lib/fees";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

type StorePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SellerStorefrontPage({ params }: StorePageProps) {
  const { slug } = await params;
  const storeItems = CATALOG_ITEMS.filter((item) => item.storeSlug === slug);
  const storeName =
    storeItems[0]?.sellerName ??
    slug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

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

      <main className="mx-auto max-w-7xl px-4 py-10 space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
            Verified Seller Storefront
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950">{storeName}</h1>
          <p className="mt-1 text-sm text-slate-600">
            Independent storefront on Plaedoe&apos;s Place in the Market with transparent 5% + 5%
            marketplace fee disclosures and tracked order fulfillment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900">
            Storefront Listings ({storeItems.length})
          </h2>
          {storeItems.length === 0 ? (
            <p className="mt-3 text-sm text-slate-600">
              No active items listed under this store slug yet.{" "}
              <Link href="/shop" className="font-semibold text-emerald-700 hover:underline">
                Browse all marketplace listings
              </Link>
              .
            </p>
          ) : (
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {storeItems.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
                >
                  <div>
                    <p className="text-xs text-slate-500">{item.categoryName}</p>
                    <h3 className="mt-1 text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-lg font-bold text-slate-950">
                      {formatCentsToUsd(item.salePriceCents ?? item.priceCents)}
                    </span>
                    <Link
                      href={`/products/${item.slug}`}
                      className="rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                    >
                      View Product
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
