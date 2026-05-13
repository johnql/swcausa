# SWCA — Senior Women's Christian Association

Full-stack web application for swcausa.org serving senior women across Massachusetts, New Hampshire, Rhode Island, and Vermont.

**Stack:** Next.js 16 (App Router) · TypeScript · Prisma 7 · Supabase Auth · Stripe · Resend · Tailwind CSS · Vitest

---

## Features

- Member registration with password, profile management, and emergency contact storage
- Wellness class schedule and RSVP system
- Product store with Stripe Checkout
- Donation page with Stripe Checkout
- Newsletter subscription with welcome + admin notification emails
- Contact form with email forwarding
- Role-based dashboards: Admin (full member/order/class management) and Convener (assigned member view)
- SEO: sitemap, robots.txt, Open Graph metadata

---

## Local Development

### Prerequisites

- Node.js 18+
- A Supabase project (free tier works)
- A Stripe account (test mode)
- A Resend account (free tier works)

### 1. Clone and install

```bash
git clone https://github.com/johnql/swcausa.git
cd swcausa
npm install
```

### 2. Environment variables

Create `.env.local` in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database (Supabase Postgres — use the pooler connection string)
DATABASE_URL=postgresql://postgres.xxxx:password@aws-1-us-west-1.pooler.supabase.com:5432/postgres

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...
```

### 3. Push schema and seed data

```bash
npx prisma db push        # creates all tables
npx prisma db seed        # loads 6 wellness classes + 4 products
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Database — Promote an Admin

After a user registers via `/join`, grant admin access via SQL (Supabase dashboard → SQL Editor, or using the Prisma CLI):

```bash
npx prisma db execute --stdin <<'EOF'
UPDATE members SET "isAdmin" = true WHERE email = 'your@email.com';
EOF
```

To grant convener access:

```bash
npx prisma db execute --stdin <<'EOF'
UPDATE members SET "isConvener" = true WHERE email = 'convener@email.com';
EOF
```

---

## Deployment — Vercel

### 1. Connect the GitHub repo

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `johnql/swcausa` from GitHub
3. Vercel detects Next.js automatically — no framework changes needed
4. Confirm build settings:
   - **Build Command:** `prisma generate && next build`
   - **Output Directory:** `.next`

### 2. Set environment variables

In Vercel → Project → Settings → Environment Variables, add all variables from the `.env.local` table above.

| Variable | Where to find it |
| --- | --- |
| `DATABASE_URL` | Supabase → Project Settings → Database → Connection string (use **Transaction** pooler) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API keys |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Created in step 3 below |
| `RESEND_API_KEY` | Resend Dashboard → API Keys |

### 3. Stripe webhook

1. Stripe Dashboard → Developers → Webhooks → **Add endpoint**
2. URL: `https://swcausa.org/api/webhooks/stripe`
3. Events: `checkout.session.completed`, `charge.refunded`
4. Copy the **Signing secret** → add as `STRIPE_WEBHOOK_SECRET` in Vercel

### 4. Supabase auth redirect URLs

Supabase → Authentication → URL Configuration:

- **Site URL:** `https://swcausa.org`
- **Redirect URLs:**
  - `https://swcausa.org/api/auth/callback`
  - `https://*.vercel.app/api/auth/callback`

### 5. Custom domain (optional)

Vercel → Project → Settings → Domains → add `swcausa.org` and `www.swcausa.org`. Update DNS with the CNAME/A records Vercel provides.

### 6. After first deploy — seed and promote admin

```bash
# Seed wellness classes and products (safe to re-run)
npx prisma db seed

# Promote your admin account
npx prisma db execute --stdin <<'EOF'
UPDATE members SET "isAdmin" = true WHERE email = 'your@email.com';
EOF
```

---

## Testing

### Run all tests

```bash
npm test
```

### Run in watch mode

```bash
npm run test:watch
```

### Run with coverage

```bash
npm run test:coverage
```

### Test suite overview

116 tests across 15 files:

| Area | File | Tests |
| --- | --- | --- |
| API — member registration | `tests/api/members.test.ts` | 14 |
| API — member profile update | `tests/api/members-patch.test.ts` | 5 |
| API — admin role management | `tests/api/admin-role.test.ts` | 6 |
| API — admin convener assignment | `tests/api/admin-convener.test.ts` | 7 |
| API — Stripe checkout | `tests/api/checkout.test.ts` | 6 |
| API — Stripe webhook | `tests/api/webhook.test.ts` | 6 |
| API — donation | `tests/api/donate.test.ts` | 8 |
| API — newsletter | `tests/api/newsletter.test.ts` | 9 |
| API — contact form | `tests/api/contact.test.ts` | 6 |
| API — class RSVP | `tests/api/rsvp.test.ts` | 10 |
| Data — wellness classes | `tests/data/classes.test.ts` | 8 |
| Data — service states | `tests/data/states.test.ts` | 5 |
| Component — DonationForm | `tests/components/DonationForm.test.tsx` | 9 |
| Component — BuyButton | `tests/components/BuyButton.test.tsx` | 6 |
| Component — NewsletterForm | `tests/components/NewsletterForm.test.tsx` | 6 |

### Post-deploy smoke tests

After deploying, verify these manually:

- [ ] Homepage loads with images at `https://swcausa.org`
- [ ] Register a new member via `/join` — welcome email arrives
- [ ] Log in via `/login` with the registered password
- [ ] Subscribe to newsletter at `/` footer — subscriber + admin emails arrive
- [ ] RSVP to a class from `/classes`
- [ ] Stripe checkout on `/store` — use card `4242 4242 4242 4242`, any future date, any CVC
- [ ] Stripe donation on `/donate`
- [ ] Log in as admin → `/admin` — stats, member list, role toggles visible
- [ ] Promote a member to convener in `/admin/members`
- [ ] Log in as convener → `/convener` — assigned members appear
- [ ] Visit `/nonexistent` — custom 404 page appears
- [ ] Resize to mobile — hamburger menu opens and closes correctly

---

## Project Structure

```text
app/
  (public pages)  about, classes, contact, donate, events, join, login,
                  forgot-password, privacy, terms, store, page (home)
  admin/          Admin dashboard — members, classes, orders
  convener/       Convener dashboard
  profile/        Member profile view + edit
  orders/         Member order history
  api/            REST API routes
    members/      Registration (POST), profile update (PATCH /:id)
    admin/        Role management, convener assignment
    checkout/     Stripe Checkout session
    donate/       Stripe donation session
    webhooks/     Stripe webhook handler
    newsletter/   Newsletter subscription
    contact/      Contact form
    rsvp/         Class RSVP (POST / DELETE)
    auth/         Supabase auth callback

components/       Shared UI components
lib/              Prisma client, Supabase clients, Resend client
data/             Static data (wellness classes, states)
prisma/           Schema, seed script
tests/            Vitest test suite
```

---

## Key Environment Notes

- Never commit `.env.local` — it is git-ignored
- Use **test mode** Stripe keys during development (`pk_test_`, `sk_test_`)
- Switch to **live mode** keys in Vercel production environment variables only
- The Stripe webhook secret differs between test and live mode — update accordingly
