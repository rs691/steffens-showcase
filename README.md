# Steffens Showcase

Full-stack woodworking portfolio built with **Next.js 15**, **Supabase**, and **Stripe**.

Live: [steffens-showcase.vercel.app](https://steffens-showcase.vercel.app)

## Features

- Product catalog with detail pages backed by Supabase (local fallback for dev)
- Custom sign designer with cart and server-side Stripe Checkout pricing
- **Design Copilot** — Vercel AI Gateway + AI SDK tool calling (`retrieveKnowledge` RAG, `searchWoods`, `quoteSign`, `applyDesignDraft`) with streaming UI and session logging
- Supabase Auth (email/password, SSR session cookies)
- Contact inquiries and order persistence via Stripe webhooks
- Protected `/admin` and `/checkout` routes via middleware

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 App Router, TypeScript |
| Auth & DB | Supabase (Postgres, RLS, SSR) |
| Payments | Stripe Checkout Sessions + webhooks |
| UI | Tailwind CSS, shadcn/ui, Radix |
| CI | GitHub Actions (typecheck, lint, test, build) |

## Getting started

```bash
git clone https://github.com/rs691/steffens-showcase.git
cd steffens-showcase
npm install
cp .env.example .env.local
# fill in Supabase + Stripe keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See [`.env.example`](.env.example). Required for full functionality:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SITE_URL`, `AUTH_SECRET`

## Scripts

```bash
npm run dev        # local dev (Turbopack)
npm run build      # production build
npm run typecheck  # TypeScript
npm run lint       # ESLint
npm run test       # unit tests
```

## Admin access

After registering, promote a user in Supabase:

```sql
UPDATE public.users SET is_admin = true WHERE email = 'you@example.com';
```

## Stripe webhook

Point your Stripe webhook to:

```
https://steffens-showcase.vercel.app/api/webhooks/stripe
```

Use **Your account** (not Connected Accounts). Event: `checkout.session.completed`.

## Deployment

Connected to Vercel project `steffens-showcase`. Production deploy:

```bash
npx vercel --prod
```

Ensure Vercel environment variables match `.env.example`.
