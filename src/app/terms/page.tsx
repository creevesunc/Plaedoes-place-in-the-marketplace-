import Link from "next/link";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-base font-bold text-slate-900">
            Plaedoe&apos;s Place in the Market
          </Link>
          <Link href="/marketplace-fee-policy" className="text-sm font-semibold text-emerald-700 hover:underline">
            Fee Policy
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
          Terms of Service &amp; Privacy Notice
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          By using Plaedoe&apos;s Place in the Market, buyers and sellers agree to accurate
          account and listing information, server-verified order pricing, the 5% Marketplace
          Commission and 5% Shipping &amp; Handling Insurance Fee on merchandise subtotals, and
          conditional payout protection rules.
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          Authentication, profile data, and marketplace records are stored in Supabase PostgreSQL
          with Row Level Security, and payments are processed through Stripe and Stripe Connect.
        </p>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
