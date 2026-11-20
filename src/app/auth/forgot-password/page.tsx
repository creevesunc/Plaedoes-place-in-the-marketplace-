import Link from "next/link";
import { MarketplaceFooter } from "@/components/MarketplaceFooter";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-base font-bold text-slate-900">
            Plaedoe&apos;s Place in the Market
          </Link>
          <Link href="/auth/login" className="text-sm font-semibold text-emerald-700 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-950">Reset or Recover Account</h1>
            <p className="mt-1 text-xs text-slate-600">
              Enter your account email to request a password reset or account recovery link.
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600">
                Account Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Send Recovery Instructions
            </button>
          </form>

          <p className="border-t border-slate-100 pt-4 text-xs text-slate-600">
            Remembered your password?{" "}
            <Link href="/auth/login" className="font-semibold text-emerald-700 hover:underline">
              Sign in
            </Link>
            .
          </p>
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  );
}
