import { ActionHeader } from '@/features/_auth/components/table/action-header';
import { AllCheckbox } from '@/features/_auth/components/table/all-checkbox';
import { RowCheckbox } from '@/features/_auth/components/table/row-checkbox';
import type { User } from '@/features/_auth/types/user';
import { DeleteUser } from '@/features/_auth/user/components/delete-user';
import { UpdateUser } from '@/features/_auth/user/components/update-user';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<User>();

export const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => <AllCheckbox table={table} />,
    cell: ({ row }) => <RowCheckbox row={row} />,
    enableHiding: false,
  }),
  columnHelper.accessor('id', {
    header: ({ column }) => <ActionHeader title="ID" column={column} />,
    meta: {
      headerText: 'ID',
    },
  }),
  columnHelper.accessor('name', {
    header: ({ column }) => <ActionHeader title="名前" column={column} />,
    meta: {
      headerText: '名前',
    },
  }),
  columnHelper.accessor('email', {
    header: ({ column }) => (
      <ActionHeader title="メールアドレス" column={column} />
    ),
    meta: {
      headerText: 'メールアドレス',
    },
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-4">
          <UpdateUser user={row.original} />
          <DeleteUser id={row.original.id} name={row.original.name} />
        </div>
      );
    },
    enableHiding: false,
  }),
];
