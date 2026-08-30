# Steffens Sign & Design

**Production-style e-commerce replica by [Robert Stewart](https://robert-stewart.dev)** — built to showcase full-stack engineering and **AI copilots** for recruiters, hiring managers, and Handshake reviewers. **Not an official business site.**

Stack: **Next.js 15**, **Supabase** (pgvector RAG), **Stripe**, **Vercel AI SDK**.

Live: [steffens-showcase.vercel.app](https://steffens-showcase.vercel.app)  
**Start here:** [custom-sign](https://steffens-showcase.vercel.app/custom-sign) (Design Copilot)  
Repo: [github.com/rs691/steffens-showcase](https://github.com/rs691/steffens-showcase)  
LinkedIn: [linkedin.com/in/robert-stewart-m](https://linkedin.com/in/robert-stewart-m)

## Features

### Shop & content
- Product catalog with detail pages (Supabase + local fallback)
- Priced catalog items can be added to cart; commission pieces use **Inquire**
- Custom sign designer (text, wood stain, size, shape, text color) at `$120` server-owned pricing
- `localStorage`-backed cart for custom signs and catalog products
- Gallery, FAQ, wood guide (`/learn`), events, projects, about, and contact form
- Contact inquiries stored in Supabase (`inquiries`)

### Auth & payments
- Supabase Auth (email/password, SSR cookies)
- Middleware protects `/admin` and `/checkout` (login required)
- Stripe Checkout Sessions for custom signs **and** priced catalog products
- Webhook persists paid orders to Supabase (`orders`)

### AI copilots
- **Design Copilot** (`/custom-sign`) — streaming chat via Vercel AI Gateway
  - Tools: `retrieveKnowledge` (RAG), `searchWoods`, `quoteSign`, `applyDesignDraft`
  - Session logging to `agent_sessions`
  - Rule-based fallback if Gateway is unavailable
- **Admin Copilot** (`/admin`, `is_admin` only)
  - Tools: `summarizeOrders`, `summarizeInquiries` (fixed selects, no raw SQL)
- **RAG** — woods / FAQ / process docs in Supabase `pgvector` (`knowledge_chunks`)
- **Rate limits & token budgets** — per-IP/user sliding window on agent routes
- **Evals** — walnut + large must quote `$120` (`npm test` / `npm run eval`)

### Admin
- Role-gated dashboard: inquiry list, order counts, RAG seed button, Admin Copilot

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 App Router, TypeScript, Turbopack (dev) |
| Auth & DB | Supabase (Postgres, RLS, SSR, pgvector) |
| Payments | Stripe Checkout + webhooks |
| AI | Vercel AI SDK v7, AI Gateway, embeddings |
| UI | Tailwind CSS, shadcn/ui, Radix, light/dark theme toggle |
| Typography | Barlow Condensed (headlines), Work Sans (body) |
| CI | GitHub Actions (typecheck, lint, test, build) |

## Getting started

```bash
git clone https://github.com/rs691/steffens-showcase.git
cd steffens-showcase
npm install
cp .env.example .env.local
# fill in Supabase, Stripe, and AI Gateway keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See [`.env.example`](.env.example).

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + SSR Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Server writes (orders, inquiries, RAG, sessions) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | Checkout + webhook |
| `NEXT_PUBLIC_SITE_URL` | Absolute URLs for Stripe redirects and sitemap |
| `AI_GATEWAY_API_KEY` | Design/Admin Copilot + embeddings (or Vercel OIDC on deploy) |
| `AI_MODEL` | Optional chat model (`openai/gpt-5-mini` default) |
| `AI_EMBEDDING_MODEL` | Optional embed model (`openai/text-embedding-3-small` default) |
| `AGENT_RATE_LIMIT_PER_MIN` / `AGENT_MAX_OUTPUT_TOKENS` / `AGENT_MAX_STEPS` / `AGENT_TOKEN_BUDGET_PER_HOUR` | Optional copilot caps |

`AUTH_SECRET` is documented for local/CI placeholders; auth is handled by Supabase sessions.

## Scripts

```bash
npm run dev        # local dev (Turbopack)
npm run build      # production build
npm run start      # production server
npm run typecheck  # TypeScript
npm run lint       # ESLint
npm run test       # unit tests (pricing, tools, RAG lexical, limits, evals)
npm run eval       # design-copilot contract (+ live if Gateway configured)
```

Seed RAG knowledge (admin UI button, or):

```bash
npx tsx --env-file=.env.local scripts/seed-knowledge.ts
```

Sync env to Vercel (helper script):

```bash
node scripts/sync-vercel-env.mjs
```

## Key routes

| Route | Notes |
|-------|-------|
| `/` | Hero + AI showcase + featured projects |
| `/about` | Recruiter demo path + admin setup |
| `/products`, `/products/[id]` | Catalog; Add to cart when priced |
| `/custom-sign` | Designer + Design Copilot |
| `/cart`, `/checkout` | Cart (open) → Stripe checkout (login required) |
| `/contact` | Demo inquiry form → Supabase |
| `/gallery`, `/faq`, `/learn`, `/events`, `/projects` | Secondary shop content pages |
| `/admin` | Admin Copilot, inquiries, seed RAG (`is_admin`) |
| `/api/agent/design` | Design Copilot stream |
| `/api/agent/admin` | Admin Copilot stream (admin only) |
| `/api/webhooks/stripe` | Order persistence |

Main nav: Home, Products, Custom Sign, Gallery, About, Contact.

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

## Demo walkthrough (Handshake / recruiters)

1. Home → **Try the Design Copilot** → ask about walnut, outdoor use, or pricing
2. Watch tool calls (RAG, quote, apply draft) and live preview update
3. Add to cart → register/login → Stripe test checkout → confirmation
4. `/about` → full recruiter demo path; `/admin` → Admin Copilot after `is_admin` promotion
5. `/products` → priced **Add to cart** vs commission **Inquire**

## Assets & credits

- Hero image: `public/updated-hero.jpg` (Leonardo AI, photoreal workshop scene)
- Logo mark: `public/logo-mark.svg`, `public/favicon-mark.svg`
- Product and gallery photos are demo assets for the fictional shop theme

## Deployment

Vercel project: `steffens-showcase`.

```bash
npx vercel --prod
```

Ensure Production env vars match `.env.example` (including `AI_GATEWAY_API_KEY` and Stripe webhook secret).
