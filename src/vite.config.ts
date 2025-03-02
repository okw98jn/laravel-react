import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

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
  resolve: {
    alias: {
      '@': '/resources/ts',
    },
  },
});
