import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { PATCH } from "@/app/api/members/[id]/route";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  db: {
    member: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";

const mockMember = {
  id: "member-1",
  email: "jane@example.com",
  firstName: "Jane",
  lastName: "Doe",
};

const validPatch = {
  firstName: "Jane",
  lastName: "Smith",
  primaryPhone: "6175550200",
  emergencyContactName: "Bob Smith",
  emergencyContactPhone: "6175550201",
  emergencyContactRelationship: "Brother",
};

function mockAuth(user: { email: string } | null) {
  vi.mocked(createClient).mockResolvedValue({
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user } }) },
  } as never);
}

function makeRequest(id: string, body: object) {
  return new NextRequest(`http://localhost:3000/api/members/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("PATCH /api/members/[id]", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 401 when not authenticated", async () => {
    mockAuth(null);
    const res = await PATCH(makeRequest("member-1", validPatch), {
      params: Promise.resolve({ id: "member-1" }),
    });
    expect(res.status).toBe(401);
  });

  it("returns 403 when member belongs to different user", async () => {
    mockAuth({ email: "other@example.com" });
    vi.mocked(db.member.findUnique).mockResolvedValue(mockMember as never);
    const res = await PATCH(makeRequest("member-1", validPatch), {
      params: Promise.resolve({ id: "member-1" }),
    });
    expect(res.status).toBe(403);
  });

  it("returns 403 when member id not found", async () => {
    mockAuth({ email: "jane@example.com" });
    vi.mocked(db.member.findUnique).mockResolvedValue(null);
    const res = await PATCH(makeRequest("member-1", validPatch), {
      params: Promise.resolve({ id: "member-1" }),
    });
    expect(res.status).toBe(403);
  });

  it("returns 400 when required fields are missing", async () => {
    mockAuth({ email: "jane@example.com" });
    vi.mocked(db.member.findUnique).mockResolvedValue(mockMember as never);
    const res = await PATCH(makeRequest("member-1", { firstName: "Jane" }), {
      params: Promise.resolve({ id: "member-1" }),
    });
    expect(res.status).toBe(400);
  });

  it("updates member and returns updated record on success", async () => {
    mockAuth({ email: "jane@example.com" });
    vi.mocked(db.member.findUnique).mockResolvedValue(mockMember as never);
    vi.mocked(db.member.update).mockResolvedValue({ ...mockMember, ...validPatch } as never);

    const res = await PATCH(makeRequest("member-1", validPatch), {
      params: Promise.resolve({ id: "member-1" }),
    });
    expect(res.status).toBe(200);
    expect(db.member.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: "member-1" } })
    );
  });
});
