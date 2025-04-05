import { ListButtonContainer } from '@/features/_auth/components/list-button-container';
import { Main } from '@/features/_auth/components/main';
import { PageTitle } from '@/features/_auth/components/page-title';
import { ColumnDisplayControl } from '@/features/_auth/components/table/column-display-control';
import { DataTable } from '@/features/_auth/components/table/data-table';
import { PaginationSize } from '@/features/_auth/components/table/paginasion-size';
import { PaginationResult } from '@/features/_auth/components/table/pagination-result';
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
  type RowSelectionState,
  type VisibilityState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { zodValidator } from '@tanstack/zod-adapter';
import { useState } from 'react';

export const Route = createFileRoute('/_auth/user/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [stripSearchParams(defaultSearchParams)],
  },
});

function RouteComponent() {
  const { filters, setFilters, resetFilters } = useFilter(Route.id);

  const { data, isError, isFetching } = useUsers(filters);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const pagination = {
    pageIndex: filters.pageIndex,
    pageSize: filters.pageSize,
  };

  const table = useReactTable({
    data: data?.data.users ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      setFilters(
        typeof updater === 'function' ? updater(pagination) : pagination,
      );
    },
    rowCount: data?.data.paginate.total,
    state: {
      rowSelection,
      pagination,
      columnVisibility,
    },
  });

  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.id);

  if (isError) {
    resetFilters();
  }

  return (
    <Main>
      <PageTitle title="ユーザー" />
      <SearchForm />
      <div className="flex items-center justify-between">
        <PaginationResult table={table} />
        <ListButtonContainer>
          <PaginationSize table={table} />
          <ColumnDisplayControl table={table} />
          <DeleteUsers
            ids={selectedIds}
            onSuccess={() => setRowSelection({})}
          />
          <CsvDownload />
          <CreateUser />
        </ListButtonContainer>
      </div>
      <DataTable table={table} isPending={isFetching} isError={isError} />
    </Main>
  );
}
