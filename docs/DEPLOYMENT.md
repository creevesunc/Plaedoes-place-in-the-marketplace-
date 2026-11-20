# Deployment & Environment Guide — Plaedoe's Place in the Market

## 1. Environment Variables
Copy `.env.example` to `.env.local` for local development (never commit `.env` or `.env.local`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY` (use `sk_test_...` first)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (use `pk_test_...` first)
- `STRIPE_WEBHOOK_SECRET` (`whsec_...`)
- `NEXT_PUBLIC_APP_URL`

## 2. Database & Storage (Supabase)
1. Create a Supabase project on the free tier.
2. Open **SQL Editor** and run `supabase/migrations/001_init_marketplace.sql`.
3. Create Storage buckets: `product-images` and `store-assets`.

## 3. Payments & Connect (Stripe Test Mode)
1. Enable **Test mode** in Stripe and activate **Stripe Connect**.
2. Configure webhook endpoint: `<YOUR_APP_URL>/api/webhooks/stripe` listening for:
   - `checkout.session.completed`
   - `charge.dispute.created`
   - `account.updated`

## 4. Hosting (Vercel + GitHub)
1. Import `creevesunc/Plaedoes-place-in-the-market-` into Vercel.
2. Add environment variables in Vercel Project Settings.
3. Deploy and verify `/` and `/api/webhooks/stripe`.
