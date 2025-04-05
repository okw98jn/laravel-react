import { Separator } from '@/components/ui/separator';
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
  type PaginationState,
  type RowSelectionState,
  type SortingState,
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

  const pagination: PaginationState = {
    pageIndex: filters.pageIndex,
    pageSize: filters.pageSize,
  };

  const sorting: SortingState = [
    {
      id: filters.sortColumn,
      desc: filters.sortDirection === 'desc',
    },
  ];

  const table = useReactTable({
    data: data?.data.users ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      setFilters(
        typeof updater === 'function' ? updater(pagination) : pagination,
      );
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater;

      if (newSorting.length > 0) {
        const { id, desc } = newSorting[0];
        setFilters({
          sortColumn: id,
          sortDirection: desc ? 'desc' : 'asc',
        });
      } else {
        // デフォルトのソート設定に戻す
        setFilters({
          sortColumn: defaultSearchParams.sortColumn,
          sortDirection: defaultSearchParams.sortDirection,
        });
      }
    },
    rowCount: data?.data.paginate.total,
    state: {
      rowSelection,
      pagination,
      columnVisibility,
      sorting,
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
      <div className="flex flex-col md:flex-row items-center justify-between">
        <PaginationResult table={table} isPending={isFetching} />
        <ListButtonContainer>
          <PaginationSize table={table} />
          <ColumnDisplayControl table={table} />
          <Separator orientation="vertical" className="h-8! hidden md:block" />
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
