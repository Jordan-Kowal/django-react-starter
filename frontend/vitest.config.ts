import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["**/*.test.ts", "**/*.test.tsx"],
    setupFiles: ["src/tests/setup.ts"],
    environment: "jsdom",
    coverage: {
      include: ["src/**"],
      exclude: ["src/tests/**"],
      all: true,
      thresholds: {
        perFile: false,
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
    },
    // Performance related
    css: true,
    isolate: true,
    retry: 3,
  },
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
});
