import ErrorHandler from '@/components/errors/error-handler';
import NotFoundError from '@/components/errors/not-found-error';
import { useAuth } from '@/hooks/use-auth';
import type { RouterContext } from '@/lib/router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    // 認証の初期化
    // リロード時に認証状態をチェック
    const { isLoading } = useAuth();

    // 認証情報の読み込み中は何も表示しない
    if (isLoading) return null;

    return (
      <>
        <Outlet />
        <TanStackRouterDevtools position="bottom-left" />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      </>
    );
  },
  // 404例外はここに来る
  notFoundComponent: NotFoundError,
  // キャッチされなかった例外はここで処理
  errorComponent: (error) => <ErrorHandler error={error} />,
});
