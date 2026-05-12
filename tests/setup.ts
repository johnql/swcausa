import "@testing-library/jest-dom";
import { vi } from "vitest";

// Suppress Next.js server-only module errors in test env
vi.mock("server-only", () => ({}));

// Mock next/navigation for pages that call redirect()
vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
  useRouter: vi.fn(() => ({ push: vi.fn(), refresh: vi.fn() })),
  usePathname: vi.fn(() => "/"),
}));

// Mock next/headers (used by Supabase SSR client)
vi.mock("next/headers", () => ({
  cookies: vi.fn(() => ({
    getAll: vi.fn(() => []),
    set: vi.fn(),
    get: vi.fn(),
  })),
}));
