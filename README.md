# Hunter AI — Waitlist Application (Phase 0)

> Built by **[Social Technancy](https://socialtechnancy.com)**

AI-powered customer discovery for African businesses. Hunter AI scans social media 24/7 to find people actively looking for what your business sells and delivers them directly to your WhatsApp.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | TailwindCSS v3 |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Database | Supabase (PostgreSQL) |
| Email | Resend |
| Icons | Lucide React |
| Deployment | Vercel (recommended) |

---

## Project Structure

```
src/
├── actions/           # Next.js Server Actions (waitlist.ts, admin.ts)
├── app/               # App Router pages (/, /admin, /r/[code], /(auth)/login)
├── components/
│   ├── landing/       # Landing page sections
│   ├── ui/            # Reusable primitives (Button, Input, Select, Badge, Card, Accordion)
│   └── waitlist/      # Waitlist form + success view
├── lib/
│   ├── supabase/      # client.ts, server.ts, admin.ts
│   ├── email/         # templates.ts (6 email templates)
│   ├── utils/         # cn.ts, code-generator.ts, referral-calculator.ts, formatters.ts
│   └── constants.ts   # App-wide constants
├── middleware.ts       # Auth-ready route protection (Phase 1 placeholder)
├── repositories/
│   └── waitlist.repository.ts  # Supabase data access layer
├── services/
│   ├── waitlist.service.ts     # Business logic
│   └── email.service.ts        # Resend email dispatch
└── types/
    ├── auth.ts         # Auth interfaces (Phase 1)
    ├── database.ts     # Supabase schema types
    └── waitlist.ts     # Waitlist domain types
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
ADMIN_EMAIL=admin@socialtechnancy.com
NEXT_PUBLIC_APP_URL=https://socialtechnancy.com
```

### 3. Set up Supabase database

Run the migration in your Supabase SQL editor:

```bash
# Copy and execute in Supabase > SQL Editor:
supabase/migrations/001_initial_schema.sql
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Database Schema

### `waitlist` table (Phase 0 + SaaS Forward Compatibility)

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `business_name` | TEXT | Business name |
| `owner_name` | TEXT | Owner full name |
| `email` | TEXT | Unique email |
| `whatsapp` | TEXT | Unique WhatsApp number |
| `business_niche` | TEXT | Business category |
| `business_description` | TEXT? | Optional business description |
| `ideal_customer` | TEXT? | Optional ICP description |
| `city` | TEXT | City of operation |
| `location` | TEXT | Specific area / neighborhood |
| `country` | TEXT | African country |
| `platforms` | JSONB | Social platforms targeting |
| `languages` | JSONB | Customer languages |
| `source` | TEXT | Acquisition source |
| `referral_code` | TEXT | Unique referral code |
| `referred_by` | TEXT? | Referrer's code |
| `referrals_count` | INT | Total referrals made |
| `points` | INT | Referral points (base 10 + 100/referral) |
| `position` | INT | Queue position |
| `status` | TEXT | pending/approved/active/onboarded |
| `created_at` | TIMESTAMPTZ | Registration time |
| `updated_at` | TIMESTAMPTZ | Last updated |

### Future SaaS Tables (Forward-Compatible)

- `profiles` — Linked to Supabase Auth users
- `tenants` — Multi-tenant support
- `subscriptions` — Plan tier management
- `hunter_jobs` — Social media crawling jobs
- `leads` — Discovered buyer records

---

## Email Templates

Six reusable templates in `src/lib/email/templates.ts`:

| Template | When sent |
|----------|-----------|
| `welcomeEmailTemplate` | On registration ✅ Active |
| `adminNotificationTemplate` | On every signup ✅ Active |
| `weeklyUpdateTemplate` | Weekly job (future) |
| `launchReminderTemplate` | Pre-launch (future) |
| `referralMilestoneTemplate` | On referral milestone (future) |
| `queuePositionUpdateTemplate` | On queue movement (future) |

---

## Admin Dashboard

Visit `/admin` to access the admin panel:
- Live waitlist entries with filtering
- Stats (total signups, referrals, avg points)
- CSV export
- Auth-ready: protected by middleware when Supabase Auth is enabled in Phase 1

---

## Referral Points System

| Action | Points |
|--------|--------|
| Registration | +10 |
| Per successful referral | +100 |
| Full profile completion | +50 (future) |

Rank tiers: Rookie → Starter → Hustler → Boss → Legend

---

## Git Setup

```bash
git init
git remote add origin https://github.com/TechnacyAi/Customers-Hunter-Ai.git
git add .
git commit -m "feat: Hunter AI Waitlist Phase 0 — production-ready"
git branch -M main
git push -u origin main
```

---

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Connect your GitHub repository in Vercel
2. Add all environment variables from `.env.example`
3. Deploy — Vercel auto-detects Next.js

---

## License

© 2024 Social Technancy. All rights reserved.
