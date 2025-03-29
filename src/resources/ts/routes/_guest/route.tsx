import { useAuth } from '@/hooks/use-auth';
import { Navigate, Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest')({
  component: RouteComponent,
});

function RouteComponent() {
  const { requireGuest } = useAuth();
  const isGuest = requireGuest();

  // 認証情報の読み込み中は何も表示しない
  if (isGuest === null) {
    return null;
  }

  if (!isGuest) {
    return <Navigate to="/" />;
  }

  return (
    <div className="pt-36 w-full flex flex-col space-y-6">
      <Outlet />
    </div>
  );
}
