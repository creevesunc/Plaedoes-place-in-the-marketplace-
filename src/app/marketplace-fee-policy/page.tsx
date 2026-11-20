import Link from "next/link";
import { calculateMarketplaceFees, formatCentsToUsd } from "@/lib/fees";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function MarketplaceFeePolicyPage() {
  const example = calculateMarketplaceFees(10000);

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
          Marketplace Fee Policy
        </h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Plaedoe&apos;s Place in the Market calculates two separate platform fees on the
          merchandise subtotal: a <strong>5% Marketplace Commission</strong> and a{" "}
          <strong>5% Shipping &amp; Handling Insurance Fee</strong> (10% combined on the
          merchandise subtotal). Both fees belong to the marketplace platform.
        </p>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2 text-sm">
          <h2 className="text-base font-bold text-slate-900">
            Example on a $100.00 Merchandise Subtotal
          </h2>
          <div className="flex justify-between">
            <span>Merchandise Subtotal</span>
            <span>{formatCentsToUsd(example.merchandiseSubtotalCents)}</span>
          </div>
          <div className="flex justify-between">
            <span>Marketplace Commission (5%)</span>
            <span>{formatCentsToUsd(example.marketplaceCommissionCents)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping &amp; Handling Insurance Fee (5%)</span>
            <span>{formatCentsToUsd(example.shippingHandlingInsuranceCents)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-2 font-semibold text-emerald-800">
            <span>Seller Merchandise Proceeds</span>
            <span>{formatCentsToUsd(example.sellerProceedsCents)}</span>
          </div>
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
