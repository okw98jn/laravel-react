import { Toaster } from '@/components/ui/sonner';
import { useAuth } from '@/features/admin/hooks/use-auth';
import { queryClient } from '@/lib/query';
import { router } from '@/lib/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';

export function App() {
  const auth = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors closeButton theme="light" />
      <RouterProvider router={router} context={{ auth }} />
    </QueryClientProvider>
  );
}
