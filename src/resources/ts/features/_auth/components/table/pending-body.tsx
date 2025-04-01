import { Skeleton } from '@/components/ui/skeleton';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';

interface Props {
  columnLength: number;
  rowLength: number;
}

export function PendingBody({ columnLength, rowLength }: Props) {
  return (
    <TableBody>
      {Array.from({ length: rowLength }).map(() => (
        <TableRow key={crypto.randomUUID()}>
          {Array.from({ length: columnLength }).map(() => (
            <TableCell key={crypto.randomUUID()}>
              <Skeleton className="h-8" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
