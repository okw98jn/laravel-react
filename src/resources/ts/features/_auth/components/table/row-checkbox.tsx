import { Checkbox } from '@/components/ui/checkbox';
import type { Row } from '@tanstack/react-table';

interface Props<TData> {
  row: Row<TData>;
}

export function RowCheckbox<TData>({ row }: Props<TData>) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      className="translate-y-[2px]"
    />
  );
}
