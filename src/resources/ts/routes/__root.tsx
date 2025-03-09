import ErrorHandler from '@/components/errors/error-handler';
import NotFoundError from '@/components/errors/not-found-error';
import { Toaster } from '@/components/ui/sonner';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => {
    return (
      <>
        <Outlet />
        <Toaster richColors closeButton theme="light" />
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    );
  },
  notFoundComponent: NotFoundError,
  // キャッチされなかった例外はここで処理
  errorComponent: (error) => <ErrorHandler error={error} />,
});
