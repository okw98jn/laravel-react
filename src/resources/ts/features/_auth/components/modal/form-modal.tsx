import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Props {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  trigger: React.ReactElement;
  submitButton: React.ReactElement;
  children: React.ReactNode;
}

export function FormModal({
  isOpen,
  onClose,
  title,
  description,
  trigger,
  submitButton,
  children,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {trigger}
      <DialogContent className="sm:max-w-[500px] px-0">
        <DialogHeader className="px-6">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-1 px-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        <DialogFooter className="px-6">
          <Button variant="outline" onClick={onClose}>
            閉じる
          </Button>
          {submitButton}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
