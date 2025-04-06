import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Props {
  columnLength: number;
  rowLength: number;
}

export function PendingBody({ columnLength, rowLength }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow key={crypto.randomUUID()}>
          {Array.from({ length: columnLength }).map(() => (
            <TableHead key={crypto.randomUUID()}>
              <Skeleton className="h-8" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
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
    </Table>
  );
}
