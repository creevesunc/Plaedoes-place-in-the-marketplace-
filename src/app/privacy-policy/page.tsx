import Link from "next/link";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-base font-bold text-slate-900">
            Plaedoe&apos;s Place in the Market
          </Link>
          <Link href="/terms" className="text-sm font-semibold text-emerald-700 hover:underline">
            Terms of Service
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
          Privacy Policy
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Plaedoe&apos;s Place in the Market collects account details, shipping and billing
          addresses, storefront listings, order records, and support/dispute communications needed
          to operate the marketplace securely.
        </p>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2 text-sm text-slate-700">
          <h2 className="text-base font-bold text-slate-900">How Your Information Is Handled</h2>
          <p>• Authentication and database records use Supabase with Row Level Security.</p>
          <p>• Payment and seller Connect onboarding data are processed through Stripe.</p>
          <p>• Secret API keys, webhook secrets, and service role keys remain strictly server-side.</p>
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
