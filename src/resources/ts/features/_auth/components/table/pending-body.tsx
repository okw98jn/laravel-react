import { Skeleton } from '@/components/ui/skeleton';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';

interface Props {
  columnLength: number;
}

export function PendingBody({ columnLength }: Props) {
  return (
    <TableBody>
      {Array.from({ length: 12 }).map(() => (
        <TableRow key={crypto.randomUUID()}>
          {Array.from({ length: columnLength }).map(() => (
            <TableCell key={crypto.randomUUID()}>
              <Skeleton className="h-9" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
