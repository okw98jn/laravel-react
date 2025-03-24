import { Checkbox } from '@/components/ui/checkbox';
import type { Table } from '@tanstack/react-table';

interface Props<TData> {
  table: Table<TData>;
}

export function AllCheckbox<TData>({ table }: Props<TData>) {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      className="translate-y-[2px]"
    />
  );
}
