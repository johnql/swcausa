import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { PATCH } from "@/app/api/admin/members/[id]/convener/route";

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

const adminMember  = { id: "admin-1", email: "admin@swcausa.org",   isAdmin: true,  isConvener: false };
const convener     = { id: "conv-1",  email: "conv@swcausa.org",    isAdmin: false, isConvener: true  };
const targetMember = { id: "mem-1",  email: "member@example.com",   isAdmin: false, isConvener: false };

function makeRequest(body: object) {
  return new NextRequest("http://localhost:3000/api/admin/members/mem-1/convener", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const params = Promise.resolve({ id: "mem-1" });

function setupAdminAuth() {
  vi.mocked(createClient).mockResolvedValue({
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { email: "admin@swcausa.org" } } }) },
  } as never);
}

describe("PATCH /api/admin/members/[id]/convener", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(db.member.update).mockResolvedValue({
      ...targetMember,
      convenerAssigned: convener.email,
    } as never);
  });

  it("returns 401 when unauthenticated", async () => {
    vi.mocked(createClient).mockResolvedValue({
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: null } }) },
    } as never);
    const res = await PATCH(makeRequest({ convenerEmail: convener.email }), { params });
    expect(res.status).toBe(401);
  });

  it("returns 403 when caller is not an admin", async () => {
    setupAdminAuth();
    vi.mocked(db.member.findUnique).mockResolvedValueOnce({ ...adminMember, isAdmin: false } as never);
    const res = await PATCH(makeRequest({ convenerEmail: convener.email }), { params });
    expect(res.status).toBe(403);
  });

  it("returns 404 when target member does not exist", async () => {
    setupAdminAuth();
    vi.mocked(db.member.findUnique)
      .mockResolvedValueOnce(adminMember as never)
      .mockResolvedValueOnce(null);
    const res = await PATCH(makeRequest({ convenerEmail: convener.email }), { params });
    expect(res.status).toBe(404);
  });

  it("returns 400 for an invalid payload", async () => {
    setupAdminAuth();
    vi.mocked(db.member.findUnique)
      .mockResolvedValueOnce(adminMember as never)
      .mockResolvedValueOnce(targetMember as never);
    const res = await PATCH(makeRequest({ convenerEmail: "not-an-email" }), { params });
    expect(res.status).toBe(400);
  });

  it("returns 422 when assigned user is not a convener", async () => {
    setupAdminAuth();
    vi.mocked(db.member.findUnique)
      .mockResolvedValueOnce(adminMember as never)
      .mockResolvedValueOnce(targetMember as never)
      .mockResolvedValueOnce({ ...convener, isConvener: false } as never);
    const res = await PATCH(makeRequest({ convenerEmail: convener.email }), { params });
    expect(res.status).toBe(422);
  });

  it("assigns a convener and returns the updated email", async () => {
    setupAdminAuth();
    vi.mocked(db.member.findUnique)
      .mockResolvedValueOnce(adminMember as never)
      .mockResolvedValueOnce(targetMember as never)
      .mockResolvedValueOnce(convener as never);
    const res = await PATCH(makeRequest({ convenerEmail: convener.email }), { params });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.convenerAssigned).toBe(convener.email);
  });

  it("allows unsetting the convener with null", async () => {
    setupAdminAuth();
    vi.mocked(db.member.findUnique)
      .mockResolvedValueOnce(adminMember as never)
      .mockResolvedValueOnce(targetMember as never);
    vi.mocked(db.member.update).mockResolvedValue({ ...targetMember, convenerAssigned: null } as never);
    const res = await PATCH(makeRequest({ convenerEmail: null }), { params });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.convenerAssigned).toBeNull();
  });

  it("calls db.member.update with the correct convenerAssigned value", async () => {
    setupAdminAuth();
    vi.mocked(db.member.findUnique)
      .mockResolvedValueOnce(adminMember as never)
      .mockResolvedValueOnce(targetMember as never)
      .mockResolvedValueOnce(convener as never);
    await PATCH(makeRequest({ convenerEmail: convener.email }), { params });
    expect(db.member.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "mem-1" },
        data: { convenerAssigned: convener.email },
      })
    );
  });
});
