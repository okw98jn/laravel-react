import { SIDEBAR_COOKIE_NAME, SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/features/_auth/components/header';
import { AppSidebar } from '@/features/_auth/components/sidebar/app-sidebar';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
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
