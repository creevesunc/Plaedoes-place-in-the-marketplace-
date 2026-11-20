import Link from "next/link";
import { calculateMarketplaceFees, formatCentsToUsd } from "@/lib/fees";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

const SAMPLE_ORDERS = [
  {
    id: "ord-1001",
    orderNumber: "PL-1732120000-4821",
    storeName: "Blue Ridge Kiln Co.",
    itemSummary: "Hand-Thrown Stoneware Pour-Over Carafe Set × 1",
    merchandiseSubtotalCents: 6800,
    shippingCostCents: 700,
    taxCents: 360,
    status: "SHIPPED",
    payoutStatus: "HELD",
    carrier: "USPS",
    trackingNumber: "9400111899223847192011",
  },
];

export default function BuyerOrdersPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-base font-bold text-slate-900">
            Plaedoe&apos;s Place in the Market
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/shop" className="hover:text-emerald-700">Shop All</Link>
            <Link href="/checkout" className="hover:text-emerald-700">Checkout</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
            Buyer Orders &amp; Shipment Tracking
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Track shipments, inspect itemized fee snapshots, and review buyer protection status.
          </p>
        </div>

        <div className="space-y-4">
          {SAMPLE_ORDERS.map((order) => {
            const fees = calculateMarketplaceFees(order.merchandiseSubtotalCents);
            const totalChargedCents =
              order.merchandiseSubtotalCents + order.shippingCostCents + order.taxCents;

            return (
              <article
                key={order.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <p className="text-xs font-semibold text-emerald-700">
                      Order #{order.orderNumber} • Store: {order.storeName}
                    </p>
                    <h2 className="mt-0.5 text-base font-bold text-slate-900">
                      {order.itemSummary}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-800">
                      Status: {order.status}
                    </span>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-800">
                      Payout: {order.payoutStatus}
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 text-sm">
                  <div className="rounded-xl bg-slate-50 p-4 space-y-1">
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Shipment Tracking
                    </p>
                    <p className="font-medium text-slate-900">
                      Carrier: {order.carrier}
                    </p>
                    <p className="font-mono text-xs text-slate-700">
                      Tracking #: {order.trackingNumber}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 space-y-1 text-xs">
                    <p className="font-semibold uppercase text-slate-500">
                      Order Fee Snapshot (Locked at Purchase)
                    </p>
                    <div className="flex justify-between">
                      <span>Merchandise Subtotal:</span>
                      <span>{formatCentsToUsd(order.merchandiseSubtotalCents)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marketplace Commission (5%):</span>
                      <span>{formatCentsToUsd(fees.marketplaceCommissionCents)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping &amp; Handling Insurance (5%):</span>
                      <span>{formatCentsToUsd(fees.shippingHandlingInsuranceCents)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping + Tax:</span>
                      <span>
                        {formatCentsToUsd(order.shippingCostCents + order.taxCents)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-1 text-sm font-bold text-slate-950">
                      <span>Total Paid:</span>
                      <span>{formatCentsToUsd(totalChargedCents)}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
