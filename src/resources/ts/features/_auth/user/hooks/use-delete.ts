import { useDeleteUsers } from '@/features/_auth/user/api/delete-users';
import { queryClient } from '@/lib/query';
import { useState } from 'react';
import { toast } from 'sonner';

export function useDelete(ids: number[]) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate, isPending } = useDeleteUsers();

  const handleDelete = () => {
    mutate(ids, {
      onSuccess: () => {
        setIsOpen(false);
        toast.success('ユーザーを削除しました');
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
      onError: () => {
        toast.error('ユーザーの削除に失敗しました');
      },
    });
  };

  return { isOpen, setIsOpen, handleDelete, isPending };
}
