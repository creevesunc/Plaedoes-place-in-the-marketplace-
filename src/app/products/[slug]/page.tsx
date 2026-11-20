import Link from "next/link";
import { notFound } from "next/navigation";
import { CATALOG_ITEMS } from "@/lib/catalog";
import { calculateMarketplaceFees, formatCentsToUsd } from "@/lib/fees";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

type ProductDetailProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { slug } = await params;
  const product = CATALOG_ITEMS.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const effectivePriceCents = product.salePriceCents ?? product.priceCents;
  const fees = calculateMarketplaceFees(effectivePriceCents);

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

      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 text-xs text-slate-500">
          <Link href="/shop" className="hover:underline">Shop</Link> /{" "}
          <Link href={`/shop?category=${product.categorySlug}`} className="hover:underline">
            {product.categoryName}
          </Link>{" "}
          / <span className="text-slate-800">{product.title}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-8 flex flex-col justify-between min-h-[320px]">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>SKU: {product.sku}</span>
              <span>Condition: {product.condition.replace("_", " ")}</span>
            </div>
            <div className="my-10 text-center">
              <p className="text-sm font-semibold text-emerald-700">{product.categoryName}</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">{product.title}</h2>
              <p className="mt-2 text-xs text-slate-500">
                Brand: {product.brand} • Model: {product.model}
              </p>
            </div>
            <p className="text-xs text-slate-500">
              In stock: {product.stockQuantity} available • Ships in ~{product.handlingDays} business day(s)
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
            <div>
              <p className="text-xs text-slate-500">
                Sold by{" "}
                <Link
                  href={`/stores/${product.storeSlug}`}
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  {product.sellerName}
                </Link>{" "}
                (★ {product.ratingAvg.toFixed(1)})
              </p>
              <h1 className="mt-1 text-2xl font-extrabold text-slate-950">{product.title}</h1>
              <p className="mt-3 text-2xl font-extrabold text-slate-900">
                {formatCentsToUsd(effectivePriceCents)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{product.description}</p>
            </div>

            <div className="space-y-2 rounded-xl bg-slate-50 p-4 text-xs text-slate-700">
              <p className="font-semibold text-slate-900">
                Transparent Order Fee Breakdown (Per Single Unit)
              </p>
              <div className="flex justify-between">
                <span>Merchandise</span>
                <span>{formatCentsToUsd(fees.merchandiseSubtotalCents)}</span>
              </div>
              <div className="flex justify-between">
                <span>Marketplace Commission (5%)</span>
                <span>{formatCentsToUsd(fees.marketplaceCommissionCents)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping &amp; Handling Insurance (5%)</span>
                <span>{formatCentsToUsd(fees.shippingHandlingInsuranceCents)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-semibold text-emerald-800">
                <span>Seller Merchandise Proceeds</span>
                <span>{formatCentsToUsd(fees.sellerProceedsCents)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/checkout?product=${product.slug}`}
                className="rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/shop"
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
