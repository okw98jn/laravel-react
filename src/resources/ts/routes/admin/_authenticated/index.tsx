import { Button } from '@/components/ui/button';
import { useLogoutHandler } from '@/features/admin/auth/hooks/use-logout';
import { Main } from '@/features/admin/components/main';
import { PageTitle } from '@/features/admin/components/page-title';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { handleLogout, isPending } = useLogoutHandler();

  return (
    <Main>
      <PageTitle title="ダッシュボード" />
      <Button onClick={handleLogout} isPending={isPending}>
        Logout
      </Button>
    </Main>
  );
}
