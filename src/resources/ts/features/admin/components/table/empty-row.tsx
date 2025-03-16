import { TableCell, TableRow } from '@/components/ui/table';

interface Props {
  columnLength: number;
}

export function EmptyRow({ columnLength }: Props) {
  return (
    <TableRow>
      <TableCell colSpan={columnLength} className="h-24 text-center">
        データがありません。
      </TableCell>
    </TableRow>
  );
}
