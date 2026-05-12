import { describe, it, expect } from "vitest";
import { wellnessClasses } from "@/data/classes";

describe("wellnessClasses data", () => {
  it("exports exactly 6 classes", () => {
    expect(wellnessClasses).toHaveLength(6);
  });

  it("every class has a non-empty name", () => {
    wellnessClasses.forEach((c) => expect(c.name.length).toBeGreaterThan(0));
  });

  it("every class has a non-empty slug", () => {
    wellnessClasses.forEach((c) => expect(c.slug.length).toBeGreaterThan(0));
  });

  it("all slugs are unique", () => {
    const slugs = wellnessClasses.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(wellnessClasses.length);
  });

  it("every class has a description", () => {
    wellnessClasses.forEach((c) => expect(c.description.length).toBeGreaterThan(0));
  });

  it("every class has at least one benefit", () => {
    wellnessClasses.forEach((c) => expect(c.benefits.length).toBeGreaterThan(0));
  });

  it("every class has an imageUrl pointing to /imgs/", () => {
    wellnessClasses.forEach((c) => {
      expect(c.imageUrl).toBeTruthy();
      expect(c.imageUrl).toMatch(/^\/imgs\//);
    });
  });

  it("includes expected class slugs", () => {
    const slugs = wellnessClasses.map((c) => c.slug);
    expect(slugs).toContain("tai-chi");
    expect(slugs).toContain("yoga");
    expect(slugs).toContain("fitness-exercises");
    expect(slugs).toContain("table-tennis");
    expect(slugs).toContain("group-dance");
    expect(slugs).toContain("singing");
  });

  it("every class has an origin field", () => {
    wellnessClasses.forEach((c) => expect(c.origin.length).toBeGreaterThan(0));
  });
});
