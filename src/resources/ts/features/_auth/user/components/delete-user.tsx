import { Button } from '@/components/ui/button';
import { AlertModal } from '@/features/_auth/components/modal/alert-modal';
import { useDelete } from '@/features/_auth/user/hooks/use-delete';

interface Props {
  id: number;
  name: string;
}

export function DeleteUser({ id, name }: Props) {
  const { isOpen, setIsOpen, handleDelete, isPending } = useDelete([id]);

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
