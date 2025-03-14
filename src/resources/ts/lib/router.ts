import { queryClient } from '@/lib/query';
import { routeTree } from '@/routeTree.gen';
import type { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';

export interface RouterContext {
  queryClient: QueryClient;
}

export const router = createRouter({
  routeTree,
  notFoundMode: 'root',
  context: { queryClient },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
