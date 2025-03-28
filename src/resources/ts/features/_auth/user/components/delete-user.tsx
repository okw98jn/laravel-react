import { Button } from '@/components/ui/button';
import { AlertModal } from '@/features/_auth/components/modal/alert-modal';
import { useDelete } from '@/features/_auth/user/hooks/use-delete';
import { useState } from 'react';

interface Props {
  id: number;
  name: string;
}

export function DeleteUser({ id, name }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { handleDelete, isPending } = useDelete({
    ids: [id],
    onSuccess: () => setIsOpen(false),
  });

  return (
    <AlertModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="ユーザー削除"
      description={`ユーザー「${name}」を削除しますか？`}
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
