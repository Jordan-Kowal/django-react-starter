import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["**/*.test.ts", "**/*.test.tsx"],
    setupFiles: ["src/tests/setup.ts"],
    environment: "jsdom",
    coverage: {
      exclude: ["src/tests/**", "postcss.config.ts", "tailwind.config.ts"],
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
  },
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
});
