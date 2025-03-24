import { Button } from '@/components/ui/button';
import { AlertModal } from '@/features/_auth/components/modal/alert-modal';
import { useDeleteUsers } from '@/features/_auth/user/api/delete-users';
import { useState } from 'react';

interface Props {
  ids: number[];
  name?: string;
}

export function DeleteUsers({ ids, name }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate, isPending } = useDeleteUsers();

  const handleDelete = () => {
    mutate(ids);
    setIsOpen(false);
  };

  return (
    <AlertModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="ユーザー削除"
      description={`選択中のユーザー${name ? `「${name}」` : ''}を削除しますか？`}
      trigger={
        <Button variant="destructive" size="sm" onClick={() => setIsOpen(true)}>
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
