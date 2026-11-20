import Link from "next/link";
import { INITIAL_CATEGORIES } from "@/lib/catalog";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-base font-bold text-slate-900">
            Plaedoe&apos;s Place in the Market
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/seller/dashboard" className="hover:text-emerald-700">
              Seller Dashboard
            </Link>
            <Link href="/shop" className="hover:text-emerald-700">Shop All</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
            Add New Marketplace Listing
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Configure product details, category, SKU, inventory, variants, shipping settings, and
            publication status.
          </p>
        </div>

        <form className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600">
                Product Name
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="Handcrafted Walnut Desk Organizer"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600">
                Category
              </label>
              <select
                name="category"
                defaultValue="Home & Living"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                {INITIAL_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600">
                SKU
              </label>
              <input
                type="text"
                name="sku"
                required
                placeholder="PL-WAL-001"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600">
                Price (USD)
              </label>
              <input
                type="number"
                name="priceDollars"
                step="0.01"
                min="0"
                required
                placeholder="45.00"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stockQuantity"
                min="0"
                required
                placeholder="10"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600">
                Condition
              </label>
              <select
                name="condition"
                defaultValue="NEW"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="NEW">New</option>
                <option value="LIKE_NEW">Like New</option>
                <option value="GOOD">Good</option>
                <option value="FAIR">Fair</option>
                <option value="REFURBISHED">Refurbished</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600">
                Listing Status
              </label>
              <select
                name="status"
                defaultValue="DRAFT"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="PAUSED">Paused</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600">
              Description, Dimensions, Variants &amp; Shipping Notes
            </label>
            <textarea
              name="description"
              rows={4}
              required
              placeholder="Include materials, size/color options, handling time, and return policy..."
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Save Listing
          </button>
        </form>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
