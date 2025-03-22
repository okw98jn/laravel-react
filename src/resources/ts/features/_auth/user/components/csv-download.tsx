import { Button } from '@/components/ui/button';
import { AlertModal } from '@/features/_auth/components/modal/alert-modal';
import { Download } from 'lucide-react';
import { useState } from 'react';

export function CsvDownload() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AlertModal
      isOpen={isOpen}
      onClose={handleClose}
      title="CSV出力"
      description="CSVを出力しますか？"
      trigger={
        <Button onClick={() => setIsOpen(true)}>
          <Download />
          CSV出力
        </Button>
      }
      submitButton={<Button>CSV出力</Button>}
    />
  );
}
