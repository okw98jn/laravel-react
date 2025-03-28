import { useDeleteUsers } from '@/features/_auth/user/api/delete-users';
import { queryClient } from '@/lib/query';
import { toast } from 'sonner';

interface Props {
  ids: number[];
  onSuccess: () => void;
}

export function useDelete({ ids, onSuccess }: Props) {
  const { mutate, isPending } = useDeleteUsers();

  const handleDelete = () => {
    mutate(ids, {
      onSuccess: () => {
        onSuccess();
        toast.success('ユーザーを削除しました');
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
      onError: () => {
        toast.error('ユーザーの削除に失敗しました');
      },
    });
  };

  return { handleDelete, isPending };
}
