import { Main } from '@/features/admin/components/main';
import { PageTitle } from '@/features/admin/components/page-title';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Main>
      <PageTitle title="ダッシュボード" />
    </Main>
  );
}
