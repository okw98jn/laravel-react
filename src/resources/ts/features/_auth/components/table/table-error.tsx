import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function TableError() {
  return (
    <Alert
      variant="destructive"
      className="border-destructive/50 bg-destructive/10"
    >
      <AlertCircle className="h-5 w-5 text-destructive" />
      <div className="flex-1">
        <AlertTitle className="text-destructive">
          エラーが発生しました
        </AlertTitle>
        <AlertDescription className="text-destructive/90">
          データの取得に失敗しました。
        </AlertDescription>
      </div>
    </Alert>
  );
}
