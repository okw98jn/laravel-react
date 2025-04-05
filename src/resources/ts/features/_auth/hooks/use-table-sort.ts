import type { SortingState, Updater } from '@tanstack/react-table';

interface Filters {
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  [key: string]: any;
}

interface Props {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

/**
 * @description このフックはテーブルのソートを処理するために使用されます。
 * @param filters - フィルターオブジェクト。
 * @param setFilters - フィルターを設定する関数。
 * @returns ソートオブジェクトとソート変更を処理する関数。
 */
export const useTableSort = ({ filters, setFilters }: Props) => {
  const sorting: SortingState = [
    {
      id: filters.sortColumn,
      desc: filters.sortDirection === 'desc',
    },
  ];

  const handleSortingChange = (updater: Updater<SortingState>) => {
    const newSorting =
      typeof updater === 'function' ? updater(sorting) : updater;

    if (newSorting.length > 0) {
      const { id, desc } = newSorting[0];

      setFilters({
        sortColumn: id,
        sortDirection: desc ? 'desc' : 'asc',
      });
    }
  };

  return { sorting, handleSortingChange };
};
