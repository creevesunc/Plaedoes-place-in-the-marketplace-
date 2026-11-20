import Link from "next/link";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-base font-bold text-slate-900">
            Plaedoe&apos;s Place in the Market
          </Link>
          <Link href="/buyer-protection" className="text-sm font-semibold text-emerald-700 hover:underline">
            Buyer Protection
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
          Returns, Refunds &amp; Dispute Policy
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Buyers can review order details, request support, or open an eligible dispute if an item
          arrives damaged, not as described, or fails to arrive. Open disputes place a hold on
          payout release while records are reviewed.
        </p>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2 text-sm text-slate-700">
          <h2 className="text-base font-bold text-slate-900">Refunds &amp; Dispute Handling</h2>
          <p>• Refunds and reversals are processed through Stripe and recorded on the order.</p>
          <p>• Historical order fee snapshots remain intact for audit and reconciliation.</p>
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
