import { useAuthStore } from '@/store/auth';
import { Navigate, Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="pt-36 w-full flex flex-col space-y-6">
      <Outlet />
    </div>
  );
}
