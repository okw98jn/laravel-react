import { ListButtonContainer } from '@/features/_auth/components/list-button-container';
import { Main } from '@/features/_auth/components/main';
import { PageTitle } from '@/features/_auth/components/page-title';
import { DataTable } from '@/features/_auth/components/table/data-table';
import { useFilter } from '@/features/_auth/hooks/use-filter';
import { useUsers } from '@/features/_auth/user/api/fetch-users';
import { CreateUser } from '@/features/_auth/user/components/create-user';
import { CsvDownload } from '@/features/_auth/user/components/csv-download';
import { SearchForm } from '@/features/_auth/user/components/search-form';
import { columns } from '@/features/_auth/user/components/table-columns';
import { searchSchema } from '@/features/_auth/user/schema/search';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';

export const Route = createFileRoute('/_auth/user/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
});

function RouteComponent() {
  const { filters, setFilters } = useFilter(Route.id);
  const { data, isPending, isError } = useUsers(filters);

  const paginationState = {
    pageIndex: filters.pageIndex,
    pageSize: filters.pageSize,
  };

  return (
    <Main>
      <PageTitle title="ユーザー" />
      <SearchForm />
      <ListButtonContainer>
        <CsvDownload />
        <CreateUser />
      </ListButtonContainer>
      <DataTable
        columns={columns}
        data={data?.data.users ?? []}
        isPending={isPending}
        isError={isError}
        pagination={paginationState}
        paginationOptions={{
          onPaginationChange: (pagination) => {
            setFilters(
              // 関数の場合とオブジェクトの場合がある
              typeof pagination === 'function'
                ? pagination(paginationState)
                : pagination,
            );
          },
          rowCount: data?.data.rowCount,
        }}
      />
    </Main>
  );
}
