import Link from "next/link";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function AccessibilityPage() {
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
          Accessibility Information
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Plaedoe&apos;s Place in the Market is designed to support readable contrast, semantic
          headings and landmarks, keyboard navigation, and responsive layouts across mobile,
          tablet, and desktop screens.
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          If you encounter an accessibility barrier while browsing, checking out, or managing a
          storefront, please reach out through our support and FAQ channels so we can address it.
        </p>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
