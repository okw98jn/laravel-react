import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PAGE_SIZE_OPTIONS } from '@/constants/paginate';
import type { Table } from '@tanstack/react-table';

interface Props<TData> {
  table: Table<TData>;
}

export function PaginationSize<TData>({ table }: Props<TData>) {
  return (
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
  );
}
