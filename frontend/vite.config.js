/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    million.vite({ auto: true }),
    eslint({ failOnWarning: false, failOnError: false, cache: false }),
    react(),
  ],
  server: {
    port: 3000,
    cors: true,
    proxy: {
      '^/(api)|(media)|(static)/': {
        target: 'http://api:8000',
        changeOrigin: true,
      },
    },
  },
  esbuild: {
    loader: 'jsx',
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
  build: {
    assetsDir: 'static',
  },
});
