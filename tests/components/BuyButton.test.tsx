// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BuyButton from "@/components/BuyButton";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("BuyButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("location", { href: "" });
  });

  it("renders with default label 'Buy Now'", () => {
    render(<BuyButton productId="prod-1" />);
    expect(screen.getByRole("button", { name: /buy now/i })).toBeInTheDocument();
  });

  it("renders with a custom label", () => {
    render(<BuyButton productId="prod-1" label="Purchase" />);
    expect(screen.getByRole("button", { name: /purchase/i })).toBeInTheDocument();
  });

  it("redirects to /login on 401 response", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({ status: 401, ok: false, json: async () => ({}) });

    render(<BuyButton productId="prod-1" />);
    await user.click(screen.getByRole("button"));
    await waitFor(() => expect(window.location.href).toBe("/login"));
  });

  it("redirects to Stripe URL on success", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ url: "https://checkout.stripe.com/buy-session" }),
    });

    render(<BuyButton productId="prod-1" />);
    await user.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(window.location.href).toBe("https://checkout.stripe.com/buy-session")
    );
  });

  it("shows error message on API failure", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: "Product unavailable" }),
    });

    render(<BuyButton productId="prod-1" />);
    await user.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(screen.getByText(/product unavailable/i)).toBeInTheDocument()
    );
  });

  it("shows loading state while request is in flight", async () => {
    const user = userEvent.setup();
    let resolve: (v: unknown) => void;
    mockFetch.mockReturnValue(new Promise((r) => { resolve = r; }));

    render(<BuyButton productId="prod-1" />);
    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("button", { name: /redirecting/i })).toBeDisabled();
    resolve!({ ok: true, status: 200, json: async () => ({ url: "https://stripe.com" }) });
  });

  it("calls /api/checkout with the correct productId", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ url: "https://stripe.com" }),
    });

    render(<BuyButton productId="prod-abc" />);
    await user.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/checkout",
        expect.objectContaining({ body: JSON.stringify({ productId: "prod-abc" }) })
      )
    );
  });
});
