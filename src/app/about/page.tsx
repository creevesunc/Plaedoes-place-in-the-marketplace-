import Link from "next/link";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function AboutUsPage() {
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
          About Plaedoe&apos;s Place in the Market
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Plaedoe&apos;s Place in the Market is a multi-vendor online marketplace designed to give
          independent sellers dedicated storefronts while giving shoppers clear pricing, shipment
          tracking, and order protection.
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          Every merchandise order uses a transparent fee structure consisting of a 5% Marketplace
          Commission and a 5% Shipping &amp; Handling Insurance Fee on the merchandise subtotal,
          snapshotted at purchase time and enforced server-side.
        </p>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
