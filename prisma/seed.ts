import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // ── Wellness Classes ─────────────────────────────────────────────────────
  const classes = [
    {
      slug: "tai-chi",
      name: "Tai Chi",
      origin: "Classical Yang-style; ancient Chinese meditation in motion",
      description:
        "Slow flowing movements with deep breathing rooted in ancient Chinese tradition. Tai Chi brings calm focus and gentle strength to everyday life.",
      benefits: ["Stress reduction", "Balance improvement", "Flexibility", "Joint health"],
      sessions: [
        { dayOfWeek: "Tuesday & Thursday", time: "10:00 AM", location: "Senior Center, Boston", state: "MA" },
        { dayOfWeek: "Wednesday", time: "10:00 AM", location: "Community Center, Concord", state: "NH" },
        { dayOfWeek: "Monday", time: "9:30 AM", location: "Recreation Center, Providence", state: "RI" },
      ],
    },
    {
      slug: "yoga",
      name: "Yoga",
      origin: "Ancient Indian philosophical tradition",
      description:
        "Rooted in ancient Indian philosophy, yoga strengthens the body, enhances balance, and nurtures harmony between body, mind, and spirit.",
      benefits: ["Body strength", "Balance", "Flexibility", "Stress relief", "Joint stiffness relief"],
      sessions: [
        { dayOfWeek: "Mon / Wed / Fri", time: "9:00 AM", location: "SWCA Studio, Lowell", state: "MA" },
        { dayOfWeek: "Tuesday & Thursday", time: "10:00 AM", location: "Wellness Center, Burlington", state: "VT" },
      ],
    },
    {
      slug: "fitness-exercises",
      name: "Fitness Exercises",
      origin: "Low-impact; ability-adapted",
      description:
        "Safe, low-impact exercises adapted to individual abilities, supporting strength, balance, and cardiovascular wellness.",
      benefits: ["Strength", "Balance", "Flexibility", "Cardiovascular wellness"],
      sessions: [
        { dayOfWeek: "Mon – Fri", time: "8:30 AM", location: "Fitness Studio, Springfield", state: "MA" },
        { dayOfWeek: "Mon / Wed / Fri", time: "9:00 AM", location: "Fitness Center, Manchester", state: "NH" },
        { dayOfWeek: "Tuesday & Thursday", time: "9:00 AM", location: "Wellness Studio, Warwick", state: "RI" },
      ],
    },
    {
      slug: "table-tennis",
      name: "Table Tennis",
      origin: "Recreational sport",
      description:
        "A lively and engaging sport that sharpens the mind and body, improving coordination, reflexes, and mental alertness.",
      benefits: ["Hand-eye coordination", "Reflexes", "Mental alertness", "Cardiovascular health"],
      sessions: [
        { dayOfWeek: "Saturday", time: "10:00 AM", location: "Recreation Hall, Cambridge", state: "MA" },
        { dayOfWeek: "Friday", time: "2:00 PM", location: "Community Center, Montpelier", state: "VT" },
      ],
    },
    {
      slug: "group-dance",
      name: "Group Dance",
      origin: "Rhythmic movement",
      description:
        "Joyful rhythmic movement that enhances coordination and cardiovascular health while stimulating memory and fostering social connection.",
      benefits: ["Balance", "Coordination", "Cardiovascular health", "Memory stimulation", "Social bonding"],
      sessions: [
        { dayOfWeek: "Friday", time: "11:00 AM", location: "Community Hall, Worcester", state: "MA" },
        { dayOfWeek: "Thursday", time: "11:00 AM", location: "Recreation Center, Nashua", state: "NH" },
      ],
    },
    {
      slug: "singing",
      name: "Singing",
      origin: "Group vocal activity",
      description:
        "Group singing that strengthens breathing capacity, supports lung function, improves posture, and provides cognitive engagement through music.",
      benefits: ["Breathing capacity", "Lung function", "Posture", "Cognitive engagement"],
      sessions: [
        { dayOfWeek: "Wednesday", time: "2:00 PM", location: "SWCA Hall, Brockton", state: "MA" },
        { dayOfWeek: "Saturday", time: "11:00 AM", location: "Community Center, Cranston", state: "RI" },
        { dayOfWeek: "Sunday", time: "3:00 PM", location: "Church Hall, Rutland", state: "VT" },
      ],
    },
  ] as const;

  for (const cls of classes) {
    const { sessions, ...classData } = cls;
    const saved = await prisma.wellnessClass.upsert({
      where: { slug: classData.slug },
      create: { ...classData, benefits: [...classData.benefits] },
      update: { ...classData, benefits: [...classData.benefits] },
    });

    for (const s of sessions) {
      await prisma.classSession.upsert({
        where: {
          // composite unique not defined — use findFirst + create pattern
          id: (
            await prisma.classSession.findFirst({
              where: { classId: saved.id, state: s.state, dayOfWeek: s.dayOfWeek },
            })
          )?.id ?? "new",
        },
        create: { classId: saved.id, ...s },
        update: { time: s.time, location: s.location },
      });
    }
  }
  console.log("✓ Wellness classes seeded");

  // ── Products ─────────────────────────────────────────────────────────────
  const products = [
    {
      skuId: "swca-membership-annual",
      productName: "Annual Membership Renewal",
      description: "Renew your SWCA membership for another year and enjoy all wellness programs and community events.",
      price: 50.0,
      inStock: true,
    },
    {
      skuId: "swca-shirt-001",
      productName: "SWCA Logo T-Shirt",
      description: "Comfortable cotton T-shirt featuring the SWCA logo. Available in sizes S–3XL.",
      price: 25.0,
      inStock: true,
    },
    {
      skuId: "swca-bottle-001",
      productName: "SWCA Insulated Water Bottle",
      description: "24 oz stainless steel water bottle with SWCA branding. Keeps drinks cold 24 hrs or hot 12 hrs.",
      price: 20.0,
      inStock: true,
    },
    {
      skuId: "swca-workshop-ticket",
      productName: "Wellness Workshop Ticket",
      description: "General admission ticket to SWCA seasonal wellness workshops and special events.",
      price: 15.0,
      inStock: true,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { skuId: p.skuId },
      create: p,
      update: p,
    });
  }
  console.log("✓ Products seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
