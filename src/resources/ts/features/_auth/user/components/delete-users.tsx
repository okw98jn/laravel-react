import { Button } from '@/components/ui/button';
import { AlertModal } from '@/features/_auth/components/modal/alert-modal';
import { useDelete } from '@/features/_auth/user/hooks/use-delete';
import { Trash } from 'lucide-react';

interface Props {
  ids: number[];
}

export function DeleteUsers({ ids }: Props) {
  const { isOpen, setIsOpen, handleDelete, isPending } = useDelete(ids);

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
