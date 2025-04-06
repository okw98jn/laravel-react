import type { Table } from '@tanstack/react-table';

interface Props<TData> {
  table: Table<TData>;
  isPending: boolean;
}

export function PaginationResult<TData>({ table, isPending }: Props<TData>) {
  const currentPage = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getRowCount();

  // 現在のページの開始位置と終了位置を計算
  const startRow = currentPage * pageSize + 1;
  const endRow = Math.min(startRow + pageSize - 1, totalRows);

  return (
    <div className="text-sm text-muted-foreground">
      {isPending ? '' : `${totalRows}件中 ${startRow} ~ ${endRow}件を表示`}
    </div>
  );
}
