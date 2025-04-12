import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import million from "million/compiler";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  plugins: [
    million.vite({ auto: true }),
    tailwindcss(),
    react(),
    visualizer({
      filename: "bundle-stats.html",
      title: "Bundle Stats",
      gzipSize: true,
      open: true,
    }),
  ],
  server: {
    port: 3000,
    cors: true,
    proxy: {
      // Docker setup
      // "^/(api)|(media)|(static)/": {
      //   target: "http://api:8000",
      //   changeOrigin: true,
      // },
      // Local setup
      "^/(api)|(media)|(static)/": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  esbuild: {
    loader: "tsx",
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".ts": "tsx",
      },
    },
  },
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
  build: {
    assetsDir: "static",
  },
  test: {
    include: ["**/*.test.ts", "**/*.test.tsx"],
    setupFiles: ["src/tests/setup.ts"],
    environment: "jsdom",
    coverage: {
      exclude: [
        "dist/**",
        "src/tests/**",
        "i18n/**",
        "i18next-parser.config.ts",
        "vite.config.ts",
        // Types
        "src/types/**",
        "src/api/types.ts",
        // Special cases
        "src/App.tsx",
        "src/main.tsx",
      ],
      all: true,
      thresholds: {
        perFile: false,
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
    },
    css: true,
    isolate: true,
    retry: 1,
  },
}));
