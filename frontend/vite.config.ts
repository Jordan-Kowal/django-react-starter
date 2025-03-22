import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import million from "million/compiler";
import { resolve } from "node:path";
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
      "^/(api)|(media)|(static)/": {
        target: "http://api:8000",
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
}));
