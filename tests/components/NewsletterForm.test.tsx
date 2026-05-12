// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsletterForm from "@/components/NewsletterForm";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("NewsletterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
  });

  it("renders email input and subscribe button", () => {
    render(<NewsletterForm />);
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
  });

  it("requires email to be filled before submit (HTML5 validation)", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("calls /api/newsletter with the entered email", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);
    await user.type(screen.getByPlaceholderText(/email address/i), "jane@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/newsletter",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ email: "jane@example.com" }),
        })
      )
    );
  });

  it("shows success message after successful submission", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);
    await user.type(screen.getByPlaceholderText(/email address/i), "jane@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    await waitFor(() => expect(screen.getByText(/subscribed/i)).toBeInTheDocument());
  });

  it("shows error message on API failure", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Server error" }),
    });
    render(<NewsletterForm />);
    await user.type(screen.getByPlaceholderText(/email address/i), "jane@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));
    await waitFor(() => expect(screen.getByText(/server error/i)).toBeInTheDocument());
  });

  it("shows loading state while submitting", async () => {
    const user = userEvent.setup();
    let resolve: (v: unknown) => void;
    mockFetch.mockReturnValue(new Promise((r) => { resolve = r; }));

    render(<NewsletterForm />);
    await user.type(screen.getByPlaceholderText(/email address/i), "jane@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(screen.getByRole("button", { name: /subscribing/i })).toBeDisabled();
    resolve!({ ok: true, json: async () => ({ success: true }) });
  });
});
