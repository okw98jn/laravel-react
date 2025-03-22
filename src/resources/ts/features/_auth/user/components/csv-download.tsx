import { Button } from '@/components/ui/button';
import { AlertModal } from '@/features/_auth/components/modal/alert-modal';
import { useFileDownload } from '@/hooks/use-file-download';
import { Download } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function CsvDownload() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate, isPending } = useFileDownload();

  const handleDownload = () => {
    mutate('/users/download', {
      onSuccess: () => {
        setIsOpen(false);
        toast.success('CSVのダウンロードが完了しました');
      },
      onError: () => {
        toast.error('CSVのダウンロードに失敗しました');
      },
    });
  };

  return (
    <AlertModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="CSV出力"
      description="CSVを出力しますか？"
      trigger={
        <Button onClick={() => setIsOpen(true)}>
          <Download />
          CSV出力
        </Button>
      }
      submitButton={
        <Button onClick={handleDownload} isPending={isPending}>
          CSV出力
        </Button>
      }
    />
  );
}
