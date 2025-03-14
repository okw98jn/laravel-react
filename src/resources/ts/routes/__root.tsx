import ErrorHandler from '@/components/errors/error-handler';
import NotFoundError from '@/components/errors/not-found-error';
import type { RouterContext } from '@/lib/router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <>
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    );
  },
  notFoundComponent: NotFoundError,
  // キャッチされなかった例外はここで処理
  errorComponent: (error) => <ErrorHandler error={error} />,
});
