import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/(auth)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="pt-36 w-full flex flex-col space-y-6">
      <Outlet />
    </div>
  );
}
