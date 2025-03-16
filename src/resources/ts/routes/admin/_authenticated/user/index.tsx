import { Main } from '@/features/admin/components/main';
import { PageTitle } from '@/features/admin/components/page-title';
import { DataTable } from '@/features/admin/components/table/data-table';
import { useFilter } from '@/features/admin/hooks/use-filter';
import { useUsers } from '@/features/admin/user/api/fetch-users';
import { SearchForm } from '@/features/admin/user/components/search-form';
import { columns } from '@/features/admin/user/components/table-columns';
import { searchSchema } from '@/features/admin/user/schema/search';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';

export const Route = createFileRoute('/admin/_authenticated/user/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
});

function RouteComponent() {
  const { filters } = useFilter('/admin/_authenticated/user/');
  const { data, isPending, isError } = useUsers(filters);

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
