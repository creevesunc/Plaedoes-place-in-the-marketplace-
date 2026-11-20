import Link from "next/link";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function ShippingPolicyPage() {
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

      <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
          Shipping &amp; Fulfillment Policy
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Sellers fulfill orders according to their published handling times and provide carrier and
          tracking numbers so buyers can monitor shipments from dispatch to delivery.
        </p>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2 text-sm text-slate-700">
          <h2 className="text-base font-bold text-slate-900">Key Shipping Standards</h2>
          <p>• Shipping rates and handling windows are disclosed before checkout.</p>
          <p>• A separate 5% Shipping &amp; Handling Insurance Fee applies to the merchandise subtotal.</p>
          <p>• Tracking records are logged on orders to support delivery verification and payout protection.</p>
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
