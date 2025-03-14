import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/_authenticated')({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      toast.error('ログインしてください。');
      throw redirect({ to: '/admin/login' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
