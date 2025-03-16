import { Main } from '@/features/admin/components/main';
import { PageTitle } from '@/features/admin/components/page-title';
import { DataTable } from '@/features/admin/components/table/data-table';
import type { User } from '@/features/admin/types/user';
import { columns } from '@/features/admin/user/components/table-columns';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_authenticated/user/')({
  component: RouteComponent,
});

function RouteComponent() {
  const data: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    },
  ];

  return (
    <Main>
      <PageTitle title="ユーザー" />
      <DataTable columns={columns} data={data} isPending={false} />
    </Main>
  );
}
