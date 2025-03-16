import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';

interface Props {
  handleClear: () => void;
}

export function ButtonGroup({ handleClear }: Props) {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={handleClear}>
        クリア
      </Button>
      <Button type="submit">
        <SearchIcon />
        検索
      </Button>
    </div>
  );
}
