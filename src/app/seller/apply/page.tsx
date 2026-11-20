import Link from "next/link";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function SellerApplyPage() {
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
            <Link href="/marketplace-fee-policy" className="hover:text-emerald-700">
              Fee Policy
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
        <div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
            Multi-Vendor Onboarding &amp; Stripe Connect
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
            Become a Seller on Plaedoe&apos;s Place in the Market
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Submit your storefront details and connect a Stripe Express account for payouts.
            Seller proceeds are calculated after the separate 5% Marketplace Commission and 5%
            Shipping &amp; Handling Insurance Fee.
          </p>
        </div>

        <form className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="Jordan Taylor"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="seller@example.com"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                required
                placeholder="Taylor Craft LLC"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600">
                Storefront Name
              </label>
              <input
                type="text"
                name="storeName"
                required
                placeholder="Taylor's Workshop"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="(555) 234-5678"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600">
                Business Type
              </label>
              <select
                name="businessType"
                defaultValue="INDIVIDUAL_SOLE_PROP"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="INDIVIDUAL_SOLE_PROP">Individual / Sole Proprietorship</option>
                <option value="LLC">LLC</option>
                <option value="CORPORATION">Corporation</option>
                <option value="PARTNERSHIP">Partnership</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600">
              Store Description, Shipping &amp; Return Approach
            </label>
            <textarea
              name="storeDescription"
              rows={4}
              required
              placeholder="Describe what you sell, typical handling times, and your return policy..."
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <label className="flex items-start gap-2.5 text-xs text-slate-700">
            <input type="checkbox" name="acceptAgreement" required className="mt-0.5" />
            <span>
              I accept the Seller Agreement, Marketplace Fee Policy (5% commission + 5%
              shipping &amp; handling insurance on merchandise subtotal), and conditional payout
              protection rules.
            </span>
          </label>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Submit Seller Application
            </button>
            <Link
              href="/seller/dashboard"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Preview Seller Dashboard
            </Link>
          </div>
        </form>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
