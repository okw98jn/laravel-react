import { Button } from '@/components/ui/button';
import { useLogoutHandler } from '@/features/admin/auth/hooks/use-logout';
import { useAuthStore } from '@/features/admin/store/auth';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { handleLogout, isPending } = useLogoutHandler();
  const { user } = useAuthStore();

  return (
    <div>
      <Button onClick={handleLogout} isPending={isPending}>
        Logout
      </Button>
      <p>{user?.name}</p>
    </div>
  );
}
