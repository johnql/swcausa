import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    // @ts-ignore — valid vitest option, types lag behind
    environmentMatchGlobs: [
      ["tests/components/**", "jsdom"],
      ["tests/api/**", "node"],
      ["tests/data/**", "node"],
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["app/api/**", "lib/**", "data/**", "components/**"],
      exclude: ["lib/generated/**", "node_modules/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
