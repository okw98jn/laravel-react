import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PAGE_SIZE_OPTIONS } from '@/constants/paginate';
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

  // 表示するページ番号の配列を生成（現在のページの前後2ページ）
  const generatePageNumbers = () => {
    const pages: number[] = [];
    // 前後に表示するページ数
    const delta = 2;

    for (
      let i = Math.max(0, currentPage - delta);
      i <= Math.min(table.getPageCount() - 1, currentPage + delta);
      i++
    ) {
      pages.push(i);
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
      <Select
        value={table.getState().pagination.pageSize.toString()}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="h-8 w-20">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent>
          {PAGE_SIZE_OPTIONS.map((pageSize) => (
            <SelectItem key={pageSize} value={pageSize.toString()}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
