# Hunter AI

**Find buyers before they find you.**

Hunter AI is an AI-powered customer discovery tool built for African businesses. It monitors social media platforms 24/7 — Facebook, Instagram, TikTok, WhatsApp groups, and Twitter — scanning for people who are actively looking for what you sell, then delivers those leads directly to your WhatsApp.

Built by [Social Technancy](https://socialtechnancy.com).

---

## What This Repository Contains

This is the **Phase 0 Waitlist** application. It is not the full SaaS product — it is the pre-launch page designed to collect signups, build anticipation, and manage a queue before the main platform goes live.

The architecture is production-ready and built to grow directly into the full SaaS product without any rebuilding.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Database | Supabase (PostgreSQL) |
| Email | Resend |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── admin/page.tsx        # Admin dashboard
│   ├── r/[code]/page.tsx     # Referral redirect
│   └── (auth)/login/page.tsx # Auth placeholder (Phase 1)
├── components/
│   ├── landing/              # All landing page sections
│   ├── waitlist/             # Waitlist form + success screen
│   └── ui/                   # Reusable UI primitives
├── actions/                  # Next.js server actions
├── repositories/             # Data access layer (Supabase)
├── services/                 # Business logic
├── lib/
│   ├── email/                # Resend email templates
│   ├── supabase/             # Client, server, admin setup
│   ├── utils/                # Helpers and formatters
│   └── validations/          # Zod schemas
└── types/                    # TypeScript type definitions
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/technacydevelopers/HUNTER-AI.git
cd HUNTER-AI
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
ADMIN_EMAIL=admin@yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 3. Set up the database

Open your Supabase project → **SQL Editor** → paste and run the contents of:

```
supabase/migrations/001_initial_schema.sql
```

This creates all the tables, indexes, Row Level Security policies, and trigger functions.

### 4. Run the development server

```bash
npm run dev
```

---

## Deploying to Vercel

1. Push to the `technacydevelopers/HUNTER-AI` repository on GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.example` in the Vercel dashboard
4. Deploy — Vercel auto-detects Next.js and handles everything

---

## Database Schema

The `waitlist` table is designed to carry forward into the full SaaS product:

| Column | Type | Purpose |
|---|---|---|
| `id` | UUID | Primary key |
| `business_name` | TEXT | Business name |
| `owner_name` | TEXT | Owner's full name |
| `email` | TEXT | Unique email address |
| `whatsapp` | TEXT | WhatsApp number for lead delivery |
| `business_niche` | TEXT | Business category |
| `business_description` | TEXT | Optional business description |
| `ideal_customer` | TEXT | Ideal customer profile |
| `city` | TEXT | City of operation |
| `location` | TEXT | Specific area or neighbourhood |
| `country` | TEXT | Country |
| `platforms` | JSONB | Target social platforms |
| `languages` | JSONB | Customer languages |
| `source` | TEXT | How they found the waitlist |
| `referral_code` | TEXT | Unique referral identifier |
| `referred_by` | TEXT | Referrer's code |
| `referrals_count` | INT | Total successful referrals |
| `points` | INT | Queue priority score |
| `position` | INT | Position in the waitlist |
| `status` | TEXT | `pending`, `approved`, `active`, `onboarded` |

Forward-compatible tables also exist for the full product: `profiles`, `tenants`, `subscriptions`, `hunter_jobs`, `leads`.

---

## Referral System

Every signup earns **10 points**. Each successful referral earns **100 points** and moves the referrer up the queue. Referring 3 or more businesses unlocks early access regardless of original position.

**Rank tiers:** Rookie → Starter → Hustler → Boss → Legend

---

## Email Templates

Six templates are ready in `src/lib/email/templates.ts`:

| Template | Trigger |
|---|---|
| Welcome | On every new signup |
| Admin Notification | On every new signup |
| Weekly Update | Scheduled (Phase 1) |
| Launch Reminder | Pre-launch (Phase 1) |
| Referral Milestone | On milestone reached (Phase 1) |
| Queue Position Update | On queue movement (Phase 1) |

---

## Admin Dashboard

Available at `/admin`. Shows live waitlist entries, stats, filtering, and CSV export. Authentication middleware is stubbed and ready for Supabase Auth in Phase 1.

---

## License

© 2024 Social Technancy. All rights reserved.
