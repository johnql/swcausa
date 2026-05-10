# SWCA — Site Capture & Web App Reference

**Source:** https://swcausa.org  
**Captured:** 2026-05-08

---

## 1. Organization Identity

**Name:** Senior Women's Christian Association (SWCA)  
**Tagline:** "A Community of Care, Wellness, and Friendship"  
**Heritage:** Inspired by the legacy of the YWCA  
**Service States:** Massachusetts · New Hampshire · Rhode Island · Vermont

### Mission Statement

> "Inspired by the legacy of the YWCA, the Senior Women's Christian Association was established to serve the unique needs of senior women — fostering a compassionate environment where every woman feels valued, empowered, and deeply cared for."

### Health Framing (Homepage Messaging)

- U.S. life expectancy (2024): women 81.4 yrs · men 76.5 yrs · national avg 79 yrs
- Core argument: modern medicine manages symptoms; SWCA addresses root wellness drivers
- Wellness pillars: **nutrition · physical activity · stress management · restorative sleep**
- Aspirational concept: **"super agers"** — people who maintain vitality well into old age

---

## 2. Core Program Areas

| # | Area | Description |
|---|---|---|
| 1 | Wellness & Physical Health | Classes and activities supporting physical vitality |
| 2 | Social & Community | Events that build meaningful connection among members |
| 3 | Advocacy | Support for housing, healthcare, and financial security |
| 4 | Education & Enrichment | Lifelong learning and cognitive engagement opportunities |

---

## 3. Wellness Classes

Six classes, each with dedicated imagery on the homepage.

| Class | Style / Origin | Key Benefits |
|---|---|---|
| **Tai Chi** | Classical Yang-style; ancient Chinese "meditation in motion" | Stress reduction, balance, flexibility, joint health |
| **Yoga** | Ancient Indian philosophical tradition | Body strength, balance, flexibility, stress & stiffness relief |
| **Fitness Exercises** | Low-impact; ability-adapted | Strength, balance, flexibility, cardiovascular wellness |
| **Table Tennis** | Recreational sport | Hand-eye coordination, reflexes, mental alertness, cardio |
| **Group Dance** | Rhythmic movement | Coordination, cardio, memory stimulation, social bonding |
| **Singing** | Group vocal activity | Lung function, breathing capacity, posture, cognitive engagement |

---

## 4. Membership — Join Us

### Sign-Up Form Fields

| Field | Type | Values |
|---|---|---|
| Gender | Select | Male, Female |
| State | Select | Massachusetts, New Hampshire, Rhode Island, Vermont |
| — | Submit Button | "Sign Up" |

### Post-Signup Flow

After submission → a **local neighborhood convener** personally calls to welcome the new member.

---

## 5. Contact

- **Contact form** with a "Send" button
- Inferred fields: Name · Email · Message (not confirmed from page source)
- Outreach is handled by local conveners; no central phone/email published

---

## 6. Navigation Structure

The current site is a **single-page application (SPA)** — all nav items are in-page anchor links.

| Nav Label | Anchor Target |
|---|---|
| About Us | `#about` (inferred) |
| Join Us | `#join` (inferred) |
| Wellness Classes | `#wellness` (inferred) |
| Contact Us | `#contact` (inferred) |

> Note: `/about`, `/wellness-classes`, `/contact`, `/join` all return HTTP 404 — all content is on `/`.

---

## 7. Visual Assets

| Asset | Notes |
|---|---|
| SWCA Logo | Used in title/header area |
| Community image | About / hero section |
| Join Us image | Membership section |
| Advisors / Contact image | Contact section |
| Tai Chi image | Wellness class card |
| Yoga image | Wellness class card |
| Fitness Exercises image | Wellness class card |
| Table Tennis image | Wellness class card |
| Group Dance image | Wellness class card |
| Singing image | Wellness class card |

---

## 8. Content Gaps — Features to Build

These are absent from the current site and represent opportunities for the web app.

### Missing Content

- [ ] Class schedules (days, times, locations)
- [ ] Instructor bios and photos
- [ ] Membership pricing / fee structure
- [ ] Event calendar
- [ ] Social media links / presence
- [ ] Footer (copyright, privacy policy, terms of service)
- [ ] Accessibility statement (WCAG compliance)
- [ ] Donation / fundraising section

### Missing Pages / Routes

- [ ] `/about` — Organization history, leadership, advisors
- [ ] `/classes` — Full class catalog with schedules
- [ ] `/events` — Calendar of upcoming events
- [ ] `/join` — Dedicated membership page
- [ ] `/contact` — Standalone contact page
- [ ] `/privacy` — Privacy policy
- [ ] `/terms` — Terms of service

### Missing Functionality

- [ ] Member login / dashboard
- [ ] Class registration / RSVP
- [ ] Newsletter signup
- [ ] Convener directory by state/neighborhood
- [ ] Donation / payment processing

---

## 9. Suggested App Architecture

```text
swcausa/
├── pages/
│   ├── index          (hero + about)
│   ├── classes        (wellness class catalog)
│   ├── events         (calendar)
│   ├── join           (membership form)
│   ├── contact        (contact form)
│   └── admin/         (convener + member management)
├── components/
│   ├── Navbar
│   ├── HeroSection
│   ├── ProgramCards
│   ├── WellnessClassCard
│   ├── MembershipForm
│   ├── ContactForm
│   ├── EventCalendar
│   └── Footer
└── data/
    ├── classes.ts     (class definitions)
    ├── states.ts      (service area states)
    └── programs.ts    (core program areas)
```

---

## 10. Data Models (Draft)

```ts
type WellnessClass = {
  id: string;
  name: string;
  origin: string;
  description: string;
  benefits: string[];
  imageUrl: string;
  schedule?: ClassSession[];
  instructorId?: string;
};

type ClassSession = {
  dayOfWeek: string;
  time: string;
  location: string;
  state: ServiceState;
};

type Member = {
  id: string;
  firstName: string;
  lastName: string;
  primaryPhone: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  state: ServiceState;
  joinedAt: Date;
  convenerAssigned?: string;
  // Emergency & insurance info only — no medical/health records
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
};

type Product = {
  productId: string;
  productName: string;
  skuId: string;
  price: number;
  description?: string;
  imageUrl?: string;
};

type Order = {
  id: string;
  orderDate: Date;
  memberId: string;
  productId: string;
  payment: PaymentStatus;
};

type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

type ServiceState = 'MA' | 'NH' | 'RI' | 'VT';
```
