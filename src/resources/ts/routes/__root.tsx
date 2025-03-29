import { fetchAuthUser } from '@/api/auth-user';
import ErrorHandler from '@/components/errors/error-handler';
import NotFoundError from '@/components/errors/not-found-error';
import type { RouterContext } from '@/lib/router';
import { useAuthStore } from '@/store/auth';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useEffect } from 'react';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    const { setUser, setLoading } = useAuthStore();

    useEffect(() => {
      setLoading(true);

      fetchAuthUser()
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [setUser, setLoading]);

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
