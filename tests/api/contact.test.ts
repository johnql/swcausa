import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";

vi.mock("@/lib/resend", () => ({
  resend: {
    emails: { send: vi.fn().mockResolvedValue({ data: { id: "email-1" }, error: null }) },
  },
}));

import { resend } from "@/lib/resend";

function makeRequest(body: object) {
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 400 when name is missing", async () => {
    const res = await POST(makeRequest({ email: "a@b.com", message: "Hello" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when email is invalid", async () => {
    const res = await POST(makeRequest({ name: "Jane", email: "not-email", message: "Hello" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when message is missing", async () => {
    const res = await POST(makeRequest({ name: "Jane", email: "a@b.com" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when message is empty string", async () => {
    const res = await POST(makeRequest({ name: "Jane", email: "a@b.com", message: "" }));
    expect(res.status).toBe(400);
  });

  it("returns 200 on valid request", async () => {
    const res = await POST(makeRequest({ name: "Jane", email: "jane@example.com", message: "Hello SWCA!" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it("sends email via Resend with sender name and reply-to", async () => {
    await POST(makeRequest({ name: "Jane Doe", email: "jane@example.com", message: "Inquiry" }));
    expect(resend.emails.send).toHaveBeenCalledWith(
      expect.objectContaining({
        replyTo: "jane@example.com",
        subject: expect.stringContaining("Jane Doe"),
      })
    );
  });
});
