import type { WellnessClass } from "@/types";

export const wellnessClasses: Omit<WellnessClass, "id" | "sessions">[] = [
  {
    slug: "tai-chi",
    name: "Tai Chi",
    origin: "Classical Yang-style; ancient Chinese meditation in motion",
    description:
      "Slow flowing movements with deep breathing rooted in ancient Chinese tradition. Tai Chi brings calm focus and gentle strength to everyday life.",
    benefits: ["Stress reduction", "Balance improvement", "Flexibility", "Joint health"],
    imageUrl: "/imgs/SWCATaiChiClass.png",
  },
  {
    slug: "yoga",
    name: "Yoga",
    origin: "Ancient Indian philosophical tradition",
    description:
      "Rooted in ancient Indian philosophy, yoga strengthens the body, enhances balance, and nurtures harmony between body, mind, and spirit.",
    benefits: ["Body strength", "Balance", "Flexibility", "Stress relief", "Joint stiffness relief"],
    imageUrl: "/imgs/SWCAYogaClass.png",
  },
  {
    slug: "fitness-exercises",
    name: "Fitness Exercises",
    origin: "Low-impact; ability-adapted",
    description:
      "Safe, low-impact exercises adapted to individual abilities, supporting strength, balance, and cardiovascular wellness.",
    benefits: ["Strength", "Balance", "Flexibility", "Cardiovascular wellness"],
    imageUrl: "/imgs/SWCAFitnessProgram.png",
  },
  {
    slug: "table-tennis",
    name: "Table Tennis",
    origin: "Recreational sport",
    description:
      "A lively and engaging sport that sharpens the mind and body, improving coordination, reflexes, and mental alertness.",
    benefits: ["Hand-eye coordination", "Reflexes", "Mental alertness", "Cardiovascular health"],
    imageUrl: "/imgs/SWCATableTennis.png",
  },
  {
    slug: "group-dance",
    name: "Group Dance",
    origin: "Rhythmic movement",
    description:
      "Joyful rhythmic movement that enhances coordination and cardiovascular health while stimulating memory and fostering social connection.",
    benefits: ["Balance", "Coordination", "Cardiovascular health", "Memory stimulation", "Social bonding"],
    imageUrl: "/imgs/SWCAGroupDance.png",
  },
  {
    slug: "singing",
    name: "Singing",
    origin: "Group vocal activity",
    description:
      "Group singing that strengthens breathing capacity, supports lung function, improves posture, and provides cognitive engagement through music.",
    benefits: ["Breathing capacity", "Lung function", "Posture", "Cognitive engagement"],
    imageUrl: "/imgs/SWCASingingParty.png",
  },
];
