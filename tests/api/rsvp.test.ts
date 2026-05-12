import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST, DELETE } from "@/app/api/rsvp/route";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  db: {
    member: { findUnique: vi.fn() },
    classRsvp: {
      upsert: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}));

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";

const mockMember = { id: "member-1", email: "jane@example.com" };

function mockAuth(user: { email: string; id: string } | null) {
  vi.mocked(createClient).mockResolvedValue({
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user } }) },
  } as never);
}

function makePostRequest(body: object) {
  return new NextRequest("http://localhost:3000/api/rsvp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function makeDeleteRequest(sessionId: string) {
  return new NextRequest(`http://localhost:3000/api/rsvp?sessionId=${sessionId}`, {
    method: "DELETE",
  });
}

// ── POST ──────────────────────────────────────────────────────────────────
describe("POST /api/rsvp", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 401 when not authenticated", async () => {
    mockAuth(null);
    const res = await POST(makePostRequest({ sessionId: "sess-1" }));
    expect(res.status).toBe(401);
  });

  it("returns 400 when sessionId is missing", async () => {
    mockAuth({ email: "jane@example.com", id: "u1" });
    const res = await POST(makePostRequest({}));
    expect(res.status).toBe(400);
  });

  it("returns 404 when member not found", async () => {
    mockAuth({ email: "jane@example.com", id: "u1" });
    vi.mocked(db.member.findUnique).mockResolvedValue(null);
    const res = await POST(makePostRequest({ sessionId: "sess-1" }));
    expect(res.status).toBe(404);
  });

  it("creates RSVP and returns 201 on success", async () => {
    mockAuth({ email: "jane@example.com", id: "u1" });
    vi.mocked(db.member.findUnique).mockResolvedValue(mockMember as never);
    vi.mocked(db.classRsvp.upsert).mockResolvedValue({
      id: "rsvp-1",
      memberId: "member-1",
      sessionId: "sess-1",
      createdAt: new Date(),
    } as never);

    const res = await POST(makePostRequest({ sessionId: "sess-1" }));
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.id).toBe("rsvp-1");
  });

  it("upserts so duplicate RSVPs don't throw", async () => {
    mockAuth({ email: "jane@example.com", id: "u1" });
    vi.mocked(db.member.findUnique).mockResolvedValue(mockMember as never);
    vi.mocked(db.classRsvp.upsert).mockResolvedValue({ id: "rsvp-1" } as never);

    const res = await POST(makePostRequest({ sessionId: "sess-1" }));
    expect(res.status).toBe(201);
    expect(db.classRsvp.upsert).toHaveBeenCalledOnce();
  });
});

// ── DELETE ────────────────────────────────────────────────────────────────
describe("DELETE /api/rsvp", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 401 when not authenticated", async () => {
    mockAuth(null);
    const res = await DELETE(makeDeleteRequest("sess-1"));
    expect(res.status).toBe(401);
  });

  it("returns 400 when sessionId query param is missing", async () => {
    mockAuth({ email: "jane@example.com", id: "u1" });
    const req = new NextRequest("http://localhost:3000/api/rsvp", { method: "DELETE" });
    const res = await DELETE(req);
    expect(res.status).toBe(400);
  });

  it("returns 404 when member not found", async () => {
    mockAuth({ email: "jane@example.com", id: "u1" });
    vi.mocked(db.member.findUnique).mockResolvedValue(null);
    const res = await DELETE(makeDeleteRequest("sess-1"));
    expect(res.status).toBe(404);
  });

  it("deletes RSVP and returns ok: true", async () => {
    mockAuth({ email: "jane@example.com", id: "u1" });
    vi.mocked(db.member.findUnique).mockResolvedValue(mockMember as never);
    vi.mocked(db.classRsvp.deleteMany).mockResolvedValue({ count: 1 } as never);

    const res = await DELETE(makeDeleteRequest("sess-1"));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it("calls deleteMany with correct memberId and sessionId", async () => {
    mockAuth({ email: "jane@example.com", id: "u1" });
    vi.mocked(db.member.findUnique).mockResolvedValue(mockMember as never);
    vi.mocked(db.classRsvp.deleteMany).mockResolvedValue({ count: 1 } as never);

    await DELETE(makeDeleteRequest("sess-abc"));
    expect(db.classRsvp.deleteMany).toHaveBeenCalledWith({
      where: { memberId: "member-1", sessionId: "sess-abc" },
    });
  });
});
