# SWCA Web App — Design Plan & Budget

**Organization:** Senior Women's Christian Association (SWCA)
**Date:** 2026-05-09
**Scope:** Full web application to replace the current single-page static site

---

## 1. Project Goals

1. Replace the static SPA with a fully functional multi-page web app
2. Enable online member registration with emergency and insurance info
3. Provide wellness class discovery, scheduling, and RSVP
4. Support e-commerce for merchandise or program fees
5. Give conveners and admins a management dashboard
6. Build a scalable foundation for future features (events, donations)

---

## 2. User Roles

| Role | Access |
| --- | --- |
| **Visitor** | Browse public pages, submit contact/join forms |
| **Member** | Manage personal profile, register for classes, place orders |
| **Convener** | View and support members in their local area |
| **Admin** | Full access — members, classes, orders, events, settings |

---

## 3. Member Profile — Data Policy

> The site does **not** store health or medical records.
> Only the minimum information needed for emergency response is collected.

### Member Fields

| Field | Purpose |
| --- | --- |
| First & Last Name | Identity |
| Primary Phone | Contact |
| Email | Login + communications |
| Gender | Program eligibility |
| State | Assign to local convener |
| Emergency Contact Name | Safety |
| Emergency Contact Phone | Safety |
| Emergency Contact Relationship | Safety |
| Insurance Provider *(optional)* | Emergency situation reference |
| Insurance Policy Number *(optional)* | Emergency situation reference |

**Not collected:** medical history, diagnoses, prescriptions, disability status, caregiver assignments, or any clinical data.

---

## 4. Feature Scope by Phase

### Phase 1 — Foundation (Weeks 1–6)

| Feature | Details |
| --- | --- |
| Public pages | Home, About, Wellness Classes, Join, Contact |
| Member registration | Sign-up with personal + emergency/insurance fields |
| Authentication | Email/password login, password reset |
| Member profile | View and edit own information |
| Responsive design | Mobile-first layout throughout |
| Contact form | Sends email notification to admin |

### Phase 2 — Classes & Dashboards (Weeks 7–12)

| Feature | Details |
| --- | --- |
| Class catalog | Wellness class listings with descriptions |
| Class scheduling | Sessions with day / time / location per state |
| Class RSVP | Members register for upcoming sessions |
| Convener dashboard | View members in their neighborhood |
| Admin dashboard | Member list, class management, basic reporting |
| Email notifications | Welcome, class confirmation, reminders |

### Phase 3 — Commerce & Engagement (Weeks 13–18)

| Feature | Details |
| --- | --- |
| Product store | Browse and purchase merchandise or program materials |
| Order management | Member order history; admin fulfillment view |
| Payment processing | Stripe — membership fees, products, donations |
| Event calendar | Upcoming events with RSVP |
| Newsletter signup | Email list opt-in |
| Donation module | One-time and recurring contributions |

### Phase 4 — Polish & Launch (Weeks 19–24)

| Feature | Details |
| --- | --- |
| Instructor profiles | Bios, photos, class assignments |
| Accessibility audit | WCAG 2.1 AA compliance |
| SEO | Meta tags, sitemap, structured data |
| Analytics | Traffic and engagement reporting |
| Social media links | Footer integration |
| Privacy policy & terms | Compliant with data collection practices |

---

## 5. Page & Route Map

```text
/                    → Home (hero, about, program overview)
/about               → Organization history, mission, advisors
/classes             → Wellness class catalog
/classes/[id]        → Class detail + schedule
/events              → Event calendar
/join                → Membership registration
/login               → Member login
/forgot-password     → Password reset
/profile             → Member profile (protected)
/profile/edit        → Edit member info (protected)
/store               → Product catalog
/store/[id]          → Product detail
/cart                → Shopping cart
/checkout            → Payment + order confirmation
/orders              → Member order history (protected)
/contact             → Contact form
/privacy             → Privacy policy
/terms               → Terms of service

/convener            → Convener dashboard (protected)
/admin               → Admin overview (protected)
/admin/members       → Member management
/admin/classes       → Class & schedule management
/admin/orders        → Order fulfillment
/admin/events        → Event management
```

---

## 6. Hosting Decision — Vercel + Supabase Free Tier

**Chosen approach:** Start at $0/mo on free tiers. Upgrade only when usage warrants it.

| Layer | Service | Starting Plan | Cost |
| --- | --- | --- | --- |
| App Hosting + CDN | Vercel | Hobby (free) | $0 |
| Database + Auth + Storage | Supabase | Free | $0 |
| Transactional Email | Resend | Free (3,000 emails/mo) | $0 |
| Payments | Stripe | Pay-as-you-go | 2.9% + $0.30/txn |
| Domain | swcausa.org | Existing | ~$2/mo amortized |
| SSL Certificate | Vercel (included) | Automatic | $0 |
| **Starting Total** | | | **~$2/mo** |

### Free Tier Limits — Know Before You Hit Them

| Service | Free Limit | Upgrade Trigger |
| --- | --- | --- |
| Vercel Hobby | 100 GB bandwidth/mo · 6,000 build min/mo | Pro $20/mo when traffic grows |
| Supabase Free | 500 MB database · 1 GB storage · 50,000 auth users · pauses after 1 week idle | Pro $25/mo when site goes live with real members |
| Resend Free | 3,000 emails/mo | $20/mo at ~100+ active members |

> **Note:** Supabase free projects pause after 7 days of inactivity. This is acceptable during development — the project will resume automatically on the next request. Upgrade to Pro ($25/mo) only when the site goes live with real members.

### Upgrade Path

```text
Development  →  $0/mo   (Vercel Hobby + Supabase Free)
Growth       →  $45/mo  (+ Vercel Pro + Supabase Pro when live members join)
Scale        →  $65/mo  (+ Resend paid when email volume grows)
```

---

## 7. Recommended Tech Stack

| Layer | Choice | Reason |
| --- | --- | --- |
| Framework | Next.js 14 (App Router) | SSR, routing, API routes, excellent ecosystem |
| Language | TypeScript | Full-stack type safety |
| Styling | Tailwind CSS | Mobile-first, accessible, fast to build |
| UI Components | shadcn/ui | Accessible, composable components |
| Database | PostgreSQL via Supabase | Managed, real-time, built-in auth, free tier |
| ORM | Prisma | Type-safe queries, migration tooling |
| Auth | Supabase Auth | Email/password, row-level security |
| Payments | Stripe | Standard for fees, products, donations |
| Email | Resend + React Email | Transactional email with React templates |
| File Storage | Supabase Storage | Profile photos, class images |
| Hosting | Vercel | Zero-config Next.js, CDN, preview deployments |
| Analytics | Vercel Analytics | Privacy-friendly, no cookie consent needed |

---

## 8. Data Models Summary

| Model | Key Fields |
| --- | --- |
| **Member** | id, name, phone, email, gender, state, emergency contact (name/phone/relationship), insurance provider + policy # |
| **WellnessClass** | id, name, origin, description, benefits, imageUrl |
| **ClassSession** | id, classId, dayOfWeek, time, location, state |
| **Product** | productId, productName, skuId, price, description, imageUrl |
| **Order** | id, orderDate, memberId, productId, paymentStatus |
| **ServiceState** | MA · NH · RI · VT |
| **PaymentStatus** | pending · paid · refunded · failed |

---

## 9. UI Design Direction

- **Audience:** Senior women — prioritize readability and ease of use
- **Font size:** Minimum 16px body, 18–20px preferred; large touch targets
- **Color:** Warm, calming palette — soft teal or sage green with warm neutrals
- **Contrast:** WCAG AA minimum (4.5:1 for body text)
- **Layout:** Generous whitespace, card-based sections, simple navigation
- **Images:** Class photos, community photos (reuse from current site + new)

---

## 10. Budget Estimate

### Development (One-Time)

| Item | Low | Mid | High |
| --- | --- | --- | --- |
| UI/UX Design (wireframes + mockups) | $1,500 | $3,000 | $5,000 |
| Phase 1 — Foundation | $2,500 | $4,500 | $7,500 |
| Phase 2 — Classes & Dashboards | $2,500 | $4,500 | $7,500 |
| Phase 3 — Commerce & Payments | $2,000 | $4,000 | $6,500 |
| Phase 4 — Polish & Accessibility | $1,500 | $2,500 | $4,000 |
| QA & Testing | $1,000 | $1,500 | $3,000 |
| **Total Development** | **$11,000** | **$20,000** | **$33,500** |

> **Low** = in-house or part-time freelance developer
> **Mid** = experienced full-stack contractor
> **High** = small agency with design + dev team

### Infrastructure — Phased Cost

| Stage | Vercel | Supabase | Resend | Total/mo |
| --- | --- | --- | --- | --- |
| Development | Free | Free | Free | **~$0** |
| Growth | Pro $20 | Pro $25 | Free | **~$45** |
| Scale | Pro $20 | Pro $25 | $20 | **~$65** |

### Annual Ongoing (at Growth stage)

| Item | Annual |
| --- | --- |
| Vercel Pro | $240 |
| Supabase Pro | $300 |
| Resend | $0–$240 |
| Domain renewal | ~$20 |
| SSL (Vercel, included) | $0 |
| Maintenance & updates | $500–$2,000 |
| **Total Annual** | **$1,060–$2,800** |

---

## 11. Budget Alerts Configuration

Alerts protect against unexpected charges as usage grows. Configure these before soft launch.

### Vercel — Spend Alerts

Vercel Hobby (free) has no charges, so no billing alerts are needed during development.
When upgrading to **Vercel Pro**, configure alerts in the dashboard:

```text
Vercel Dashboard → [Team] → Settings → Billing → Spend Management
```

| Alert | Recommended Threshold | Action |
| --- | --- | --- |
| Bandwidth usage | 80 GB / month | Approaching 100 GB free limit |
| Function execution | 800,000 invocations | Approaching 1M limit |
| Monthly spend cap | $25 | Hard cap — disables overages beyond limit |

**Steps:**

1. Go to vercel.com → your team → **Settings → Billing**
2. Under **Spend Management**, enable per-resource limits
3. Set email notification at 80% of each limit
4. Set a hard **Spend Cap** of $25/mo to prevent surprise bills

---

### Supabase — Usage Alerts & Spend Cap

```text
Supabase Dashboard → Project → Settings → Billing → Cost Control
```

**Free Tier — Watch These Limits Manually:**

| Resource | Free Limit | Where to Check |
| --- | --- | --- |
| Database size | 500 MB | Dashboard → Database → Usage |
| Storage | 1 GB | Dashboard → Storage |
| Auth users | 50,000 | Dashboard → Authentication |
| Bandwidth | 5 GB | Dashboard → Reports |

**Pro Tier — Configure Spend Cap:**

1. Upgrade to Pro → **Settings → Billing → Cost Control**
2. Enable **Spend Cap** — hard limit; once hit, extra usage is blocked (not billed)
3. Set the spend cap to **$25/mo** (covers Pro base + small overage buffer)
4. Enable email notifications at **80% of each resource quota**

| Alert | Recommended Cap |
| --- | --- |
| Monthly spend cap | $25 |
| Database size warning | 6 GB (75% of 8 GB Pro limit) |
| Storage warning | 75 GB (75% of 100 GB Pro limit) |

---

### Stripe — Revenue & Fee Monitoring

Stripe has no monthly fees — only per-transaction fees — so alerts focus on tracking fee spend.

```text
Stripe Dashboard → Settings → Email Notifications
```

**Configure:**

1. **Settings → Email notifications** — enable all billing and payout alerts
2. **Stripe Radar** (free) — flags unusual transaction patterns automatically
3. Set up a monthly report: Dashboard → Reports → Scheduled reports → Monthly summary

| Alert | Purpose |
| --- | --- |
| Failed payment | Know immediately when a member's payment fails |
| Payout confirmation | Confirm funds land in your bank account |
| Dispute / chargeback | Respond within Stripe's 7-day window |
| Monthly fee summary | Track total Stripe fees paid that month |

---

### Resend — Email Volume Alerts

```text
Resend Dashboard → Settings → Alerts
```

| Alert | Threshold | Reason |
| --- | --- | --- |
| Monthly send volume | 2,400 emails (80% of 3,000 free) | Warns before hitting free limit |
| Bounce rate | > 5% | High bounces hurt email deliverability |
| Failed delivery | Any | Member didn't receive welcome/confirmation email |

---

### Budget Alert Summary

| Service | Alert Type | Threshold | Where to Configure |
| --- | --- | --- | --- |
| Vercel | Spend cap (Pro) | $25/mo | Settings → Billing → Spend Management |
| Supabase | Spend cap (Pro) | $25/mo | Settings → Billing → Cost Control |
| Supabase | DB size warning | 75% of quota | Settings → Billing → Cost Control |
| Stripe | Failed payment | Any | Settings → Email Notifications |
| Stripe | Monthly fee report | Monthly | Reports → Scheduled Reports |
| Resend | Volume warning | 2,400 emails | Settings → Alerts |

---

## 12. Timeline Summary

| Phase | Weeks | Deliverable |
| --- | --- | --- |
| Discovery & Design | 1–2 | Wireframes approved, stack confirmed |
| Phase 1 — Foundation | 3–6 | Public site live, registration working |
| Phase 2 — Classes | 7–12 | Class catalog, scheduling, dashboards live |
| Phase 3 — Commerce | 13–18 | Store, payments, events live |
| Phase 4 — Polish | 19–24 | Accessibility, SEO, full launch |
| **Total** | **~24 weeks / 6 months** | |

---

## 13. Open Questions

- [ ] In-house developer, freelancer, or agency?
- [ ] Is there an existing member list to import?
- [ ] Which state launches first, or all four at once?
- [ ] Are products physical items, digital downloads, or program fee payments?
- [ ] Is there a fixed development budget ceiling?
- [ ] Will classes be in-person, virtual (Zoom), or both?
- [ ] Who manages convener accounts — self-registration or admin-assigned?
