import Link from "next/link";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function SellerPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-base font-bold text-slate-900">
            Plaedoe&apos;s Place in the Market
          </Link>
          <Link href="/seller/apply" className="text-sm font-semibold text-emerald-700 hover:underline">
            Become a Seller
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
          Seller Policy &amp; Storefront Standards
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Sellers on Plaedoe&apos;s Place in the Market must provide accurate product descriptions,
          conditions, stock quantities, and shipping/return terms, and fulfill confirmed orders
          promptly with valid tracking information.
        </p>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2 text-sm text-slate-700">
          <h2 className="text-base font-bold text-slate-900">Storefront &amp; Payout Rules</h2>
          <p>• Seller accounts progress through verification and status states controlled by admins.</p>
          <p>• Every merchandise order separates the 5% Marketplace Commission and 5% Shipping &amp; Handling Insurance Fee.</p>
          <p>• Payouts follow conditional protection rules and remain held during open disputes.</p>
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
