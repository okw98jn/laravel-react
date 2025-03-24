import { Button } from '@/components/ui/button';
import { AlertModal } from '@/features/_auth/components/modal/alert-modal';
import { useDeleteUsers } from '@/features/_auth/user/api/delete-users';
import { queryClient } from '@/lib/query';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  ids: number[];
  name?: string;
  isAll?: boolean;
}

export function DeleteUsers({ ids, name, isAll = false }: Props) {
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

  return (
    <AlertModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="ユーザー削除"
      description={`選択中のユーザー${name ? `「${name}」` : ''}を削除しますか？`}
      trigger={
        <Button
          variant="destructive"
          size={isAll ? 'default' : 'sm'}
          onClick={() => setIsOpen(true)}
        >
          {isAll && <Trash />}
          削除
        </Button>
      }
      submitButton={
        <Button onClick={handleDelete} isPending={isPending}>
          削除
        </Button>
      }
    />
  );
}
