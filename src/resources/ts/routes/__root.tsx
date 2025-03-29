import ErrorHandler from '@/components/errors/error-handler';
import NotFoundError from '@/components/errors/not-found-error';
import { useAuth } from '@/hooks/use-auth';
import type { RouterContext } from '@/lib/router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    // ログイン状態の初期化
    useAuth();

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
