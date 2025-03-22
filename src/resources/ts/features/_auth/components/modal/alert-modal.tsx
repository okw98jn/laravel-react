import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  trigger: React.ReactElement;
  submitButton: React.ReactElement;
}

export function AlertModal({
  isOpen,
  onClose,
  title,
  description,
  trigger,
  submitButton,
}: Props) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      {trigger}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onClose}>
            閉じる
          </Button>
          {submitButton}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
