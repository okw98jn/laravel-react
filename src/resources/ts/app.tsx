import { Toaster } from '@/components/ui/sonner';
import { queryClient } from '@/lib/query';
import { router } from '@/lib/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import '@/lib/zod-i18n';

function Router() {
  return <RouterProvider router={router} />;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors closeButton theme="light" />
      <Router />
    </QueryClientProvider>
  );
}
