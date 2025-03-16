import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/_guest')({
  beforeLoad: async ({ context }) => {
    if (context.auth.isAuthenticated) {
      toast.error('ログインしています。');
      throw redirect({ to: '/admin' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="pt-36 w-full flex flex-col space-y-6">
      <Outlet />
    </div>
  );
}
