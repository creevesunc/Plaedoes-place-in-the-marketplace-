import Link from "next/link";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

const FAQS = [
  {
    q: "How do marketplace fees work on Plaedoe's Place in the Market?",
    a: "Every order calculates two separate fees on the merchandise subtotal: a 5% Marketplace Commission and a 5% Shipping & Handling Insurance Fee (10% total on merchandise subtotal). Both fees belong to the marketplace, and sellers receive the remaining merchandise amount subject to applicable adjustments and payout protection rules.",
  },
  {
    q: "When are seller proceeds released?",
    a: "Payouts are conditional and remain protected until payment confirmation via verified webhook, seller shipment and tracking entry, delivery confirmation or the protection period, verified seller account eligibility, and no open disputes.",
  },
  {
    q: "Can a seller change the 5% and 5% marketplace fee rates?",
    a: "No. Marketplace fee rates are controlled on the server and in administrator settings. Future fee updates are logged and never retroactively recalculate past orders.",
  },
];

export default function FaqPage() {
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
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
            Frequently Asked Questions &amp; Support
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Answers for buyers, independent sellers, and storefront operators.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((item) => (
            <section
              key={item.q}
              className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2"
            >
              <h2 className="text-base font-bold text-slate-900">{item.q}</h2>
              <p className="text-sm leading-relaxed text-slate-600">{item.a}</p>
            </section>
          ))}
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
