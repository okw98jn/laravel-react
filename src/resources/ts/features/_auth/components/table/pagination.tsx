import { Button } from '@/components/ui/button';
import type { Table } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface Props<TData> {
  table: Table<TData>;
}

export function Pagination<TData>({ table }: Props<TData>) {
  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();

  // 常に5ページ分表示するためのページ番号配列を生成
  const generatePageNumbers = () => {
    const pages: number[] = [];
    const displayCount = 5; // 常に表示するページ数

    // 表示開始ページを計算
    let startPage = Math.max(0, currentPage - Math.floor(displayCount / 2));

    // 末尾のページを超えないように調整
    if (startPage + displayCount > totalPages) {
      startPage = Math.max(0, totalPages - displayCount);
    }

    // 実際のページ数
    const actualPages = Math.min(displayCount, totalPages);

    for (let i = 0; i < actualPages; i++) {
      pages.push(startPage + i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mb-2">
      <Button
        variant="ghost"
        className="hidden h-8 w-8 lg:flex"
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronsLeft />
      </Button>
      <Button
        variant="ghost"
        className="h-8 w-8"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft />
      </Button>
      <div className="flex items-center gap-1">
        {generatePageNumbers().map((pageNumber) => (
          <Button
            key={`page-${pageNumber}`}
            variant={pageNumber === currentPage ? 'default' : 'ghost'}
            className="h-8 w-8"
            onClick={() => table.setPageIndex(pageNumber)}
          >
            {pageNumber + 1}
          </Button>
        ))}
      </div>
      <Button
        variant="ghost"
        className="h-8 w-8"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight />
      </Button>
      <Button
        variant="ghost"
        className="hidden h-8 w-8 lg:flex"
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronsRight />
      </Button>
    </div>
  );
}
