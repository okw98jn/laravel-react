import type { User } from '@/features/admin/types/user';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<User>[] = [
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
];
