import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/members/route";

// ── Mocks ──────────────────────────────────────────────────────────────────
vi.mock("@/lib/db", () => ({
  db: {
    member: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock("@/lib/resend", () => ({
  resend: {
    emails: { send: vi.fn().mockResolvedValue({ data: { id: "email-id" }, error: null }) },
  },
}));

import { db } from "@/lib/db";

// ── Helpers ────────────────────────────────────────────────────────────────
const validPayload = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  primaryPhone: "6175550100",
  gender: "Female",
  state: "MA",
  emergencyContactName: "John Doe",
  emergencyContactPhone: "6175550101",
  emergencyContactRelationship: "Spouse",
};

function makeRequest(body: object) {
  return new NextRequest("http://localhost:3000/api/members", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ── Tests ──────────────────────────────────────────────────────────────────
describe("POST /api/members", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 400 when required fields are missing", async () => {
    const res = await POST(makeRequest({ email: "jane@example.com" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBeDefined();
  });

  it("returns 400 for invalid email format", async () => {
    const res = await POST(makeRequest({ ...validPayload, email: "not-an-email" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid gender enum", async () => {
    const res = await POST(makeRequest({ ...validPayload, gender: "Unknown" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid state enum", async () => {
    const res = await POST(makeRequest({ ...validPayload, state: "CA" }));
    expect(res.status).toBe(400);
  });

  it("returns 409 when email already exists", async () => {
    vi.mocked(db.member.findUnique).mockResolvedValue({ id: "existing-id" } as never);
    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(409);
    const json = await res.json();
    expect(json.error).toMatch(/already exists/i);
  });

  it("returns 201 and creates member on valid payload", async () => {
    vi.mocked(db.member.findUnique).mockResolvedValue(null);
    vi.mocked(db.member.create).mockResolvedValue({
      id: "new-id",
      ...validPayload,
      joinedAt: new Date(),
    } as never);

    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.id).toBe("new-id");
  });

  it("calls db.member.create with the correct data", async () => {
    vi.mocked(db.member.findUnique).mockResolvedValue(null);
    vi.mocked(db.member.create).mockResolvedValue({ id: "x", ...validPayload } as never);

    await POST(makeRequest(validPayload));

    expect(db.member.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ email: validPayload.email }) })
    );
  });

  it("accepts optional insurance fields", async () => {
    vi.mocked(db.member.findUnique).mockResolvedValue(null);
    vi.mocked(db.member.create).mockResolvedValue({ id: "y" } as never);

    const withInsurance = { ...validPayload, insuranceProvider: "BlueCross", insurancePolicyNumber: "BC123" };
    const res = await POST(makeRequest(withInsurance));
    expect(res.status).toBe(201);
  });
});
