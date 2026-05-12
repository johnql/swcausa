import { describe, it, expect } from "vitest";
import { serviceStates } from "@/data/states";

describe("serviceStates data", () => {
  it("exports exactly 4 states", () => {
    expect(serviceStates).toHaveLength(4);
  });

  it("every state has a value and a label", () => {
    serviceStates.forEach((s) => {
      expect(s.value.length).toBeGreaterThan(0);
      expect(s.label.length).toBeGreaterThan(0);
    });
  });

  it("contains MA, NH, RI, VT", () => {
    const values = serviceStates.map((s) => s.value);
    expect(values).toContain("MA");
    expect(values).toContain("NH");
    expect(values).toContain("RI");
    expect(values).toContain("VT");
  });

  it("all state values are unique", () => {
    const values = serviceStates.map((s) => s.value);
    expect(new Set(values).size).toBe(serviceStates.length);
  });

  it("labels are full state names, not abbreviations", () => {
    serviceStates.forEach((s) => expect(s.label.length).toBeGreaterThan(2));
  });
});
