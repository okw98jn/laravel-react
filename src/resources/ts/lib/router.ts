import type { AuthData } from '@/hooks/use-auth';
import { queryClient } from '@/lib/query';
import { routeTree } from '@/routeTree.gen';
import type { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export interface RouterContext {
  queryClient: QueryClient;
  auth: AuthData;
}

export const router = createRouter({
  routeTree,
  notFoundMode: 'root',
  context: { queryClient, auth: undefined! },
});

// プログレスバー
NProgress.configure({ showSpinner: false }); // スピナー非表示
router.subscribe(
  'onBeforeLoad',
  ({ pathChanged }) => pathChanged && NProgress.start(),
);
router.subscribe('onResolved', () => NProgress.done());

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
