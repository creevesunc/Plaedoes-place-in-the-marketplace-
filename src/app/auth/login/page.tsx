import Link from "next/link";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function LoginPage() {
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

      <main className="mx-auto max-w-md px-4 py-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-950">Sign In to Your Account</h1>
            <p className="mt-1 text-xs text-slate-600">
              Access buyer orders, wishlists, seller storefront controls, or admin tools.
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-600">
            <Link href="/auth/register" className="font-semibold text-emerald-700 hover:underline">
              Create an account
            </Link>
            <Link href="/auth/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
