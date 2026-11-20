import Link from "next/link";

export function MarketplaceFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <p className="text-base font-bold text-slate-900">
            Plaedoe&apos;s Place in the Market
          </p>
          <p className="text-xs leading-relaxed text-slate-500">
            Independent multi-vendor marketplace built for clear pricing, seller storefronts, and
            order protection.
          </p>
          <p className="text-xs font-medium text-emerald-700">
            5% Commission + 5% Shipping &amp; Handling Insurance
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
            Shop &amp; Buyers
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-emerald-700">Shop All</Link></li>
            <li><Link href="/categories" className="hover:text-emerald-700">Categories</Link></li>
            <li><Link href="/buyer/orders" className="hover:text-emerald-700">Track &amp; View Orders</Link></li>
            <li><Link href="/buyer-protection" className="hover:text-emerald-700">Buyer Protection</Link></li>
            <li><Link href="/faq" className="hover:text-emerald-700">FAQ &amp; Support</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
            Sellers &amp; Admin
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/seller/apply" className="hover:text-emerald-700">Become a Seller</Link></li>
            <li><Link href="/seller/dashboard" className="hover:text-emerald-700">Seller Dashboard</Link></li>
            <li><Link href="/marketplace-fee-policy" className="hover:text-emerald-700">Marketplace Fee Policy</Link></li>
            <li><Link href="/seller-policy" className="hover:text-emerald-700">Seller Policy</Link></li>
            <li><Link href="/admin" className="hover:text-emerald-700">Admin Console</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
            Policies &amp; Info
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-emerald-700">About Us</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-emerald-700">Shipping Policy</Link></li>
            <li><Link href="/returns-policy" className="hover:text-emerald-700">Returns &amp; Refunds</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-emerald-700">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-emerald-700">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Plaedoe&apos;s Place in the Market. All rights reserved.
      </div>
    </footer>
  );
}
