import { Main } from '@/features/_auth/components/main';
import { PageTitle } from '@/features/_auth/components/page-title';
import { ColumnDisplayControl } from '@/features/_auth/components/table/column-display-control';
import { DataTable } from '@/features/_auth/components/table/data-table';
import { PaginationSize } from '@/features/_auth/components/table/paginasion-size';
import { PaginationResult } from '@/features/_auth/components/table/pagination-result';
import { useFilter } from '@/features/_auth/hooks/use-filter';
import { useTablePaginate } from '@/features/_auth/hooks/use-table-paginate';
import { useTableSort } from '@/features/_auth/hooks/use-table-sort';
import { useTableState } from '@/features/_auth/hooks/use-table-state';
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
import { getSelectedIds } from '@/features/_auth/utils/table';
import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { zodValidator } from '@tanstack/zod-adapter';

export const Route = createFileRoute('/_auth/user/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [stripSearchParams(defaultSearchParams)],
  },
});

function RouteComponent() {
  // クエリパラメーターを管理
  const { filters, setFilters, resetFilters } = useFilter(Route.id);

  // ユーザー一覧を取得
  const { data, isError, isFetching } = useUsers(filters);

  // ページネーションを管理
  const { pagination, handlePaginationChange } = useTablePaginate({
    filters,
    setFilters,
  });

  // ソートを管理
  const { sorting, handleSortingChange } = useTableSort({
    filters,
    setFilters,
  });

  // テーブルの状態を管理
  const {
    rowSelection,
    columnVisibility,
    setRowSelection,
    setColumnVisibility,
  } = useTableState();

  // テーブルを作成
  const table = useReactTable({
    data: data?.data.users ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => handlePaginationChange(updater),
    onSortingChange: (updater) => handleSortingChange(updater),
    rowCount: data?.data.paginate.total,
    state: {
      rowSelection,
      pagination,
      columnVisibility,
      sorting,
    },
  });

  // エラーが発生した場合、クエリパラメーターをリセット
  if (isError) {
    resetFilters();
  }

  return (
    <Main>
      <PageTitle title="ユーザー" />
      <SearchForm />
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div className="mb-2 lg:mb-0">
          <PaginationResult table={table} isPending={isFetching} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <PaginationSize table={table} />
          <ColumnDisplayControl table={table} />
          <DeleteUsers
            ids={getSelectedIds(table)}
            onSuccess={() => setRowSelection({})}
          />
          <CsvDownload />
          <CreateUser />
        </div>
      </div>
      <DataTable table={table} isPending={isFetching} isError={isError} />
    </Main>
  );
}
