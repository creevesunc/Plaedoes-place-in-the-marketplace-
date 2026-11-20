import Link from "next/link";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function BuyerProtectionPage() {
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
          Buyer Protection &amp; Conditional Payout Safeguards
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Every order on Plaedoe&apos;s Place in the Market includes itemized fee visibility (5%
          Marketplace Commission + 5% Shipping &amp; Handling Insurance on merchandise subtotal),
          shipment tracking visibility, and conditional seller payout protection.
        </p>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 text-sm text-slate-700">
          <h2 className="text-base font-bold text-slate-900">How Order Protection Works</h2>
          <ul className="space-y-2">
            <li>• Payments are confirmed via Stripe webhooks before orders advance to fulfillment.</li>
            <li>• Sellers add carrier and tracking details so buyers can monitor transit status.</li>
            <li>
              • Seller payouts remain under protection review until payment confirmation, shipment
              tracking, delivery confirmation or the protection period, verified seller account
              eligibility, and no open disputes are satisfied.
            </li>
            <li>• Active disputes place a hold on payout release while administrators review records.</li>
          </ul>
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
