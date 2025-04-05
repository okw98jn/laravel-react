import { flexRender } from '@tanstack/react-table';
import type { RowData, Table as TableType } from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyRow } from '@/features/_auth/components/table/empty-row';
import { Pagination } from '@/features/_auth/components/table/pagination';
import { PendingBody } from '@/features/_auth/components/table/pending-body';
import { TableError } from '@/features/_auth/components/table/table-error';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
    headerText?: string;
  }
}

interface Props<TData> {
  table: TableType<TData>;
  isPending: boolean;
  isError: boolean;
}

export function DataTable<TData>({ table, isPending, isError }: Props<TData>) {
  if (isError) {
    return <TableError />;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={header.column.columnDef.meta?.className}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isPending ? (
            <PendingBody
              columnLength={table.getVisibleFlatColumns().length}
              rowLength={table.getState().pagination.pageSize}
            />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={row.index % 2 === 1 ? 'bg-gray-50' : ''}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <EmptyRow columnLength={table.getVisibleFlatColumns().length} />
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <Pagination table={table} />
    </>
  );
}
