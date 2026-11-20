import Link from "next/link";
import { INITIAL_CATEGORIES } from "@/lib/catalog";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function AdminConsolePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-base font-bold text-slate-900">
            Plaedoe&apos;s Place in the Market
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/seller/dashboard" className="hover:text-emerald-700">Seller Portal</Link>
            <Link href="/shop" className="hover:text-emerald-700">Storefront</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
            Marketplace Administrator Console
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Oversee seller applications, product moderation, dispute holds, audit logs, and
            marketplace fee settings.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Active Fee Configuration</h2>
            <p className="text-xs text-slate-500">
              Initial rates set to 5% commission and 5% shipping &amp; handling insurance. Future
              changes are logged and do not alter historical order snapshots.
            </p>
            <dl className="space-y-2 text-sm pt-2">
              <div className="flex justify-between">
                <dt className="text-slate-600">Marketplace Commission Rate</dt>
                <dd className="font-bold text-slate-900">5.00%</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Shipping &amp; Handling Insurance Rate</dt>
                <dd className="font-bold text-slate-900">5.00%</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-600">Combined Marketplace Fee Rate</dt>
                <dd className="font-bold text-emerald-700">10.00%</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Category &amp; Governance Controls</h2>
            <p className="text-xs text-slate-500">
              {INITIAL_CATEGORIES.length} seeded categories ready for admin ordering, visibility
              toggles, and seller verification workflows.
            </p>
            <ul className="space-y-1.5 text-sm text-slate-700 pt-2">
              <li>• Seller Statuses: NOT_APPLIED, APPLICATION_PENDING, APPROVED, REJECTED, SUSPENDED, DISABLED</li>
              <li>• Dispute Hold: Blocks payout release while dispute is OPEN</li>
              <li>• Audit Trail: Tracks fee updates, moderation actions, and transfers</li>
            </ul>
          </section>
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
