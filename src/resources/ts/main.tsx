import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Toaster } from '@/components/ui/sonner';
import { defaultQueryConfig } from '@/lib/tanstack-query';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient({
  defaultOptions: defaultQueryConfig,
});

const router = createRouter({
  routeTree,
  context: { queryClient },
  notFoundMode: 'root',
});

// スピナー非表示
NProgress.configure({ showSpinner: false });

// ローディングバー
router.subscribe('onBeforeLoad', () => NProgress.start());
router.subscribe('onResolved', () => NProgress.done());

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors closeButton theme="light" />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
