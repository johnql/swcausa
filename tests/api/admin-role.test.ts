import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { PATCH } from "@/app/api/admin/members/[id]/role/route";

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

const adminMember = { id: "admin-1", email: "admin@swcausa.org", isAdmin: true, isConvener: false };
const targetMember = { id: "member-1", email: "member@example.com", isAdmin: false, isConvener: false };

function makeRequest(body: object) {
  return new NextRequest("http://localhost:3000/api/admin/members/member-1/role", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const params = Promise.resolve({ id: "member-1" });

function setupAdminAuth() {
  vi.mocked(createClient).mockResolvedValue({
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { email: "admin@swcausa.org" } } }) },
  } as never);
}

describe("PATCH /api/admin/members/[id]/role", () => {
  beforeEach(() => {
    vi.resetAllMocks(); // resets return-value queues, not just call history
    vi.mocked(db.member.update).mockResolvedValue({ ...targetMember, isConvener: true } as never);
  });

  it("returns 401 when unauthenticated", async () => {
    vi.mocked(createClient).mockResolvedValue({
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: null } }) },
    } as never);
    const res = await PATCH(makeRequest({ isConvener: true }), { params });
    expect(res.status).toBe(401);
  });

  it("returns 403 when caller is not an admin", async () => {
    setupAdminAuth();
    vi.mocked(db.member.findUnique).mockResolvedValueOnce({ ...adminMember, isAdmin: false } as never);
    const res = await PATCH(makeRequest({ isConvener: true }), { params });
    expect(res.status).toBe(403);
  });

  it("returns 404 when target member does not exist", async () => {
    setupAdminAuth();
    vi.mocked(db.member.findUnique)
      .mockResolvedValueOnce(adminMember as never)
      .mockResolvedValueOnce(null);
    const res = await PATCH(makeRequest({ isConvener: true }), { params });
    expect(res.status).toBe(404);
  });

  it("returns 400 for an invalid payload", async () => {
    setupAdminAuth();
    vi.mocked(db.member.findUnique)
      .mockResolvedValueOnce(adminMember as never)
      .mockResolvedValueOnce(targetMember as never);
    const res = await PATCH(makeRequest({ isConvener: "yes" }), { params });
    expect(res.status).toBe(400);
  });

  it("promotes a member to convener and returns updated flags", async () => {
    setupAdminAuth();
    vi.mocked(db.member.findUnique)
      .mockResolvedValueOnce(adminMember as never)
      .mockResolvedValueOnce(targetMember as never);
    const res = await PATCH(makeRequest({ isConvener: true }), { params });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.isConvener).toBe(true);
  });

  it("calls db.member.update with the correct id and data", async () => {
    setupAdminAuth();
    vi.mocked(db.member.findUnique)
      .mockResolvedValueOnce(adminMember as never)
      .mockResolvedValueOnce(targetMember as never);
    vi.mocked(db.member.update).mockResolvedValue({ ...targetMember, isAdmin: true } as never);

    await PATCH(makeRequest({ isAdmin: true }), { params });

    expect(db.member.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "member-1" },
        data: { isAdmin: true },
      })
    );
  });
});
