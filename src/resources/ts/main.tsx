import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

// スピナー非表示a
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
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
