import { Main } from '@/features/_auth/components/main';
import { PageTitle } from '@/features/_auth/components/page-title';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Main>
      <PageTitle title="ダッシュボード" />
    </Main>
  );
}
