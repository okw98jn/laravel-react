import type { PaginationState, Updater } from '@tanstack/react-table';

interface Filters {
  pageIndex: number;
  pageSize: number;
  [key: string]: any;
}

interface Props {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

/**
 * @description このフックはテーブルのページネーションを処理するために使用されます。
 * @param filters - フィルターオブジェクト。
 * @param setFilters - フィルターを設定する関数。
 * @returns ページネーションオブジェクトとページネーション変更を処理する関数。
 */
export const useTablePaginate = ({ filters, setFilters }: Props) => {
  const pagination: PaginationState = {
    pageIndex: filters.pageIndex,
    pageSize: filters.pageSize,
  };

  const handlePaginationChange = (updater: Updater<PaginationState>) => {
    setFilters(
      typeof updater === 'function' ? updater(pagination) : pagination,
    );
  };

  return { pagination, handlePaginationChange };
};
