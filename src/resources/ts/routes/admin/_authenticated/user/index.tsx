import { Main } from '@/features/admin/components/main';
import { PageTitle } from '@/features/admin/components/page-title';
import { DataTable } from '@/features/admin/components/table/data-table';
import { useUsers } from '@/features/admin/user/api/fetch-users';
import { SearchForm } from '@/features/admin/user/components/search-form';
import { columns } from '@/features/admin/user/components/table-columns';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/_authenticated/user/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, isError } = useUsers();

  return (
    <Main>
      <PageTitle title="ユーザー" />
      <SearchForm />
      <DataTable
        columns={columns}
        data={data?.data.users ?? []}
        isPending={isPending}
        isError={isError}
      />
    </Main>
  );
}
