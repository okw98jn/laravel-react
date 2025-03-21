import { SIDEBAR_COOKIE_NAME, SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/features/_auth/components/header';
import { AppSidebar } from '@/features/_auth/components/sidebar/app-sidebar';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/_auth')({
  // ルートが読み込まれる前に実行される処理
  beforeLoad: async ({ context }) => {
    let shouldRedirect = false;
    let authUser = undefined;

    if (context.auth.isPending) {
      try {
        // ログイン状態でリロードした場合、保留中にログインページへ
        // リダイレクトされるのを防ぐため、ここで認証情報を取得する
        authUser = await context.auth.fetchData();
      } catch (_) {
        shouldRedirect = true;
      }
    }

    // 認証情報が取得できていない場合
    if (!context.auth.isAuthenticated && !authUser) {
      shouldRedirect = true;
    }

    if (shouldRedirect) {
      toast.error('ログインしてください。');
      throw redirect({ to: '/login' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const isSidebarOpen = document.cookie
    .split(';')
    .some((cookie) => cookie.trim().startsWith(`${SIDEBAR_COOKIE_NAME}=true`));

  return (
    <SidebarProvider defaultOpen={isSidebarOpen}>
      <AppSidebar />
      <div className="w-full">
        <Header />
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
