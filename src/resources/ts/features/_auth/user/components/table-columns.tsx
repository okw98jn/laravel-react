import { Button } from '@/components/ui/button';
import { AllCheckbox } from '@/features/_auth/components/table/all-checkbox';
import { RowCheckbox } from '@/features/_auth/components/table/row-checkbox';
import type { User } from '@/features/_auth/types/user';
import { DeleteUsers } from '@/features/_auth/user/components/delete-users';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => <AllCheckbox table={table} />,
    cell: ({ row }) => <RowCheckbox row={row} />,
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: '名前',
  },
  {
    accessorKey: 'email',
    header: 'メールアドレス',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-4">
          <Button variant="outline" size="sm">
            編集
          </Button>
          <DeleteUsers ids={[row.original.id]} name={row.original.name} />
        </div>
      );
    },
  },
];
