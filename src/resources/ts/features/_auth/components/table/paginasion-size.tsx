import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PAGE_SIZE_OPTIONS } from '@/constants/paginate';
import type { Table } from '@tanstack/react-table';
import { SlidersHorizontal } from 'lucide-react';

interface Props<TData> {
  table: Table<TData>;
}

export function PaginationSize<TData>({ table }: Props<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal />
          表示件数
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-32 rounded-lg"
        align="end"
        sideOffset={4}
      >
        {PAGE_SIZE_OPTIONS.map((pageSize) => (
          <DropdownMenuCheckboxItem
            key={pageSize}
            checked={table.getState().pagination.pageSize === pageSize}
            onCheckedChange={() => table.setPageSize(pageSize)}
            onSelect={(event) => event.preventDefault()}
          >
            {pageSize}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
