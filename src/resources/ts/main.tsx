import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css';
import { Toaster } from '@/components/ui/sonner';
import { queryClient } from '@/lib/query';
import { router } from '@/lib/router';

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
