import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Toaster } from '@/components/ui/sonner';
import { queryClient } from '@/lib/query';
import { router } from '@/lib/router';

// スピナー非表示
NProgress.configure({ showSpinner: false });

// ローディングバー
router.subscribe('onBeforeLoad', () => NProgress.start());
router.subscribe('onResolved', () => NProgress.done());

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
