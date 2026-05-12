// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DonationForm from "@/components/DonationForm";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("DonationForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("location", { href: "" });
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ url: "https://checkout.stripe.com/test" }),
    });
  });

  it("renders all four preset amounts", () => {
    render(<DonationForm />);
    expect(screen.getByRole("button", { name: "$10" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "$25" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "$50" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "$100" })).toBeInTheDocument();
  });

  it("$25 is selected by default and donate button shows $25", () => {
    render(<DonationForm />);
    expect(screen.getByRole("button", { name: /donate \$25/i })).toBeInTheDocument();
  });

  it("selecting a different preset updates the donate button", async () => {
    const user = userEvent.setup();
    render(<DonationForm />);
    await user.click(screen.getByRole("button", { name: "$50" }));
    expect(screen.getByRole("button", { name: /donate \$50/i })).toBeInTheDocument();
  });

  it("selecting $100 updates the donate button to $100", async () => {
    const user = userEvent.setup();
    render(<DonationForm />);
    await user.click(screen.getByRole("button", { name: "$100" }));
    expect(screen.getByRole("button", { name: /donate \$100/i })).toBeInTheDocument();
  });

  it("custom amount overrides preset selection", async () => {
    const user = userEvent.setup();
    render(<DonationForm />);
    const input = screen.getByPlaceholderText(/other amount/i);
    await user.clear(input);
    await user.type(input, "75");
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /donate \$75/i })).toBeInTheDocument()
    );
  });

  it("shows error when amount is 0", async () => {
    const user = userEvent.setup();
    render(<DonationForm />);
    const input = screen.getByPlaceholderText(/other amount/i);
    await user.clear(input);
    await user.type(input, "0");
    await user.click(screen.getByRole("button", { name: /donate/i }));
    await waitFor(() =>
      expect(screen.getByText(/minimum \$1/i)).toBeInTheDocument()
    );
  });

  it("calls /api/donate with the selected amount", async () => {
    const user = userEvent.setup();
    render(<DonationForm />);
    await user.click(screen.getByRole("button", { name: "$50" }));
    await user.click(screen.getByRole("button", { name: /donate \$50/i }));

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/donate",
        expect.objectContaining({ body: JSON.stringify({ amount: 50 }) })
      )
    );
  });

  it("redirects to Stripe URL on success", async () => {
    const user = userEvent.setup();
    render(<DonationForm />);
    await user.click(screen.getByRole("button", { name: /donate/i }));
    await waitFor(() =>
      expect(window.location.href).toBe("https://checkout.stripe.com/test")
    );
  });

  it("shows error message on API failure", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Payment service unavailable" }),
    });
    render(<DonationForm />);
    await user.click(screen.getByRole("button", { name: /donate/i }));
    await waitFor(() =>
      expect(screen.getByText(/payment service unavailable/i)).toBeInTheDocument()
    );
  });
});
