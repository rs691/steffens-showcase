# Steffens-Showcase

Full-stack woodworking portfolio built with Next.js.

## Project Overview

Steffens-Showcase is a portfolio and product showcase for a custom woodworking business. The current iteration is optimized for fast review by recruiters or hiring managers: it includes a guided demo hub, instant admin access for walkthroughs, chatbot showcases, and a checkout path that still demonstrates the flow even when Stripe is not configured.

## Key Features

- Public showcase pages for projects, products, gallery, events, contact, and more.
- Recruiter Quick Review mode at `/review` for instant access to the core demo path.
- Demo entry points on `/login` and `/admin` that do not require registration or verification.
- Admin dashboard presentation with a business-intelligence chatbot experience.
- Cart and checkout walkthroughs, including a simulated success path when Stripe keys are missing.
- Responsive component-based UI with reusable Tailwind/shadcn-style primitives.

## Current Iteration Notes

- Authentication is demo-first and local-session based for the showcase flow.
- The app includes Supabase client wiring and an MCP server for BI-style demos.
- Stripe checkout is supported when keys are configured, but the app also offers a no-key demo path so reviewers can still see the full flow.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone [YOUR_REPO_URL] Steffens-Showcase
cd Steffens-Showcase
npm install
```

### Environment Variables

Create a `.env.local` file in the project root and add the variables your deployment uses.

```bash
DATABASE_URL="[Your_DB_Connection_String]"
NEXTAUTH_SECRET="[A_Long_Random_Secret]"
STRIPE_SECRET_KEY="[Your_Stripe_Secret_Key]"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="[Your_Stripe_Publishable_Key]"
NEXT_PUBLIC_SUPABASE_URL="[Your_Supabase_URL]"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[Your_Supabase_Anon_Key]"
```

### Run Locally

```bash
npm run dev
```

The app runs at `http://localhost:3000`.

## Recruiter Quick Review Flow

Use this path to review the app without creating an account:

1. Open `/review` for a guided hub.
2. Open `/login` and click `Start Recruiter Demo (No Registration)`.
3. Open `/admin` and click `Enter Demo Admin (No Registration)` to see the dashboard and BI chatbot.
4. Open `/cart` and use `Load Demo Cart & Checkout` for a one-click cart/checkout walkthrough.
5. If Stripe environment variables are missing, `/checkout` shows a simulated successful checkout path.

## Deployment Checklist

If an older version appears live, check the following:

1. Run `npm run build` locally and confirm it succeeds.
2. Push the latest `main` branch to GitHub.
3. Confirm Vercel is linked to this repository and deploying from `main`.
4. Verify production environment variables are set in Vercel.
5. Redeploy the latest successful commit if the newest build failed.

## Future Enhancements

- Add a CMS so projects and products can be updated without code changes.
- Add filtering and browsing improvements for products and projects.
- Connect the admin demo to real analytics data when a production backend is added.
