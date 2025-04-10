/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/ts/main.tsx'],
      refresh: true,
    }),
    tailwindcss(),
    react(),
    TanStackRouterVite({
      routesDirectory: './resources/ts/routes',
      generatedRouteTree: './resources/ts/routeTree.gen.ts',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['./resources/ts/**/*.test.ts', './resources/ts/**/*.test.tsx'],
  },
  resolve: {
    alias: {
      '@': '/resources/ts',
    },
  },
  server: {
    host: true,
    hmr: {
      host: 'localhost',
    },
  },
});
