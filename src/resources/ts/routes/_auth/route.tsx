import { SIDEBAR_COOKIE_NAME, SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/features/_auth/components/header';
import { AppSidebar } from '@/features/_auth/components/sidebar/app-sidebar';
import { useAuthStore } from '@/store/auth';
import { Navigate, Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" />;

  const sidebarCookie = document.cookie
    .split(';')
    .find((cookie) => cookie.trim().startsWith(`${SIDEBAR_COOKIE_NAME}=`));

  // Cookieが存在しない場合はデフォルトでオープン状態
  const isSidebarOpen = sidebarCookie ? sidebarCookie.includes('true') : true;

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
