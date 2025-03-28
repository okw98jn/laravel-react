import { Button } from '@/components/ui/button';
import { AlertModal } from '@/features/_auth/components/modal/alert-modal';
import { useDelete } from '@/features/_auth/user/hooks/use-delete';
import { Trash } from 'lucide-react';
import { useState } from 'react';

interface Props {
  ids: number[];
  onSuccess: () => void;
}

export function DeleteUsers({ ids, onSuccess: onSuccessProp }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSuccess = () => {
    setIsOpen(false);
    onSuccessProp();
  };

  const { handleDelete, isPending } = useDelete({
    ids,
    onSuccess,
  });

  return (
    <AlertModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="ユーザー削除"
      description={`選択中のユーザー${ids.length}件を削除しますか？`}
      trigger={
        <Button
          variant="destructive"
          onClick={() => setIsOpen(true)}
          disabled={ids.length === 0}
        >
          <Trash />
          一括削除
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
