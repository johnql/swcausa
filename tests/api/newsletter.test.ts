import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/newsletter/route";

vi.mock("@/lib/resend", () => ({
  resend: {
    emails: { send: vi.fn().mockResolvedValue({ data: { id: "email-1" }, error: null }) },
  },
}));

import { resend } from "@/lib/resend";

function makeRequest(body: object) {
  return new NextRequest("http://localhost:3000/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/newsletter", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 400 for missing email", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBeDefined();
  });

  it("returns 400 for invalid email format", async () => {
    const res = await POST(makeRequest({ email: "not-an-email" }));
    expect(res.status).toBe(400);
  });

  it("returns 200 on valid email", async () => {
    const res = await POST(makeRequest({ email: "member@example.com" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it("sends welcome email to the subscriber", async () => {
    await POST(makeRequest({ email: "member@example.com" }));
    expect(resend.emails.send).toHaveBeenCalledWith(
      expect.objectContaining({ to: "member@example.com" })
    );
  });

  it("sends admin notification email", async () => {
    await POST(makeRequest({ email: "member@example.com" }));
    expect(resend.emails.send).toHaveBeenCalledTimes(2);
    const calls = vi.mocked(resend.emails.send).mock.calls;
    const adminEmail = calls.find((c) => (c[0] as { to: string }).to === "admin@swcausa.org");
    expect(adminEmail).toBeDefined();
  });

  it("welcome email uses the correct sender address", async () => {
    await POST(makeRequest({ email: "member@example.com" }));
    expect(resend.emails.send).toHaveBeenCalledWith(
      expect.objectContaining({ from: "SWCA <hello@swcausa.org>", to: "member@example.com" })
    );
  });

  it("welcome email has the correct subject line", async () => {
    await POST(makeRequest({ email: "member@example.com" }));
    expect(resend.emails.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "member@example.com",
        subject: "You're subscribed to SWCA updates!",
      })
    );
  });

  it("admin notification email includes the subscriber's address in the body", async () => {
    await POST(makeRequest({ email: "special@example.com" }));
    const calls = vi.mocked(resend.emails.send).mock.calls;
    const adminCall = calls.find((c) => (c[0] as { to: string }).to === "admin@swcausa.org");
    const body = (adminCall![0] as { html: string }).html;
    expect(body).toContain("special@example.com");
  });

  it("returns 500 if email sending fails", async () => {
    vi.mocked(resend.emails.send).mockRejectedValue(new Error("SMTP error"));
    const res = await POST(makeRequest({ email: "member@example.com" }));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toMatch(/failed to send/i);
  });
});
