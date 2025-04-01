import { ListButtonContainer } from '@/features/_auth/components/list-button-container';
import { Main } from '@/features/_auth/components/main';
import { PageTitle } from '@/features/_auth/components/page-title';
import { DataTable } from '@/features/_auth/components/table/data-table';
import { useFilter } from '@/features/_auth/hooks/use-filter';
import { useUsers } from '@/features/_auth/user/api/fetch-users';
import { CreateUser } from '@/features/_auth/user/components/create-user';
import { CsvDownload } from '@/features/_auth/user/components/csv-download';
import { DeleteUsers } from '@/features/_auth/user/components/delete-users';
import { SearchForm } from '@/features/_auth/user/components/search-form';
import { columns } from '@/features/_auth/user/components/table-columns';
import {
  defaultSearchParams,
  searchSchema,
} from '@/features/_auth/user/schema/search';
import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import {
  type PaginationState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { zodValidator } from '@tanstack/zod-adapter';
import { useState } from 'react';

export const Route = createFileRoute('/_auth/user/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
  // search: {
  //   middlewares: [stripSearchParams(defaultSearchParams)],
  // },
});

function RouteComponent() {
  const { filters, setFilters } = useFilter(Route.id);

  const { data, isError, isFetching } = useUsers(filters);

  const [rowSelection, setRowSelection] = useState({});

  const pagination = {
    pageIndex: filters.pageIndex - 1,
    pageSize: filters.pageSize,
  };

  const table = useReactTable({
    data: data?.data.users ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      setFilters(
        typeof updater === 'function'
          ? updater({ ...pagination, pageIndex: pagination.pageIndex + 1 })
          : { ...pagination, pageIndex: pagination.pageIndex + 1 },
      );
    },
    rowCount: data?.data.paginate.total,
    state: {
      rowSelection,
      pagination,
    },
  });

  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.id);

  return (
    <Main>
      <PageTitle title="ユーザー" />
      <SearchForm />
      <ListButtonContainer>
        <DeleteUsers ids={selectedIds} onSuccess={() => setRowSelection({})} />
        <CsvDownload />
        <CreateUser />
      </ListButtonContainer>
      <DataTable table={table} isPending={isFetching} isError={isError} />
    </Main>
  );
}
