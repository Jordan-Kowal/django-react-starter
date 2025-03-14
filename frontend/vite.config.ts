import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import million from "million/compiler";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const reactScanPlugin = {
  name: "inject-react-scan",
  transformIndexHtml(html: string) {
    return html.replace(
      "</head>",
      `<script src="https://unpkg.com/react-scan/dist/auto.global.js"></script></head>`,
    );
  },
};

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const plugins = [million.vite({ auto: true }), tailwindcss(), react()];

  if (isDev) plugins.push(reactScanPlugin);

  return {
    plugins: plugins,
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
      chunkSizeWarningLimit: 1024,
    },
  };
});
