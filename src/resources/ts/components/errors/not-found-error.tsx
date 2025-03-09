import { Button } from '@/components/ui/button';
import { HTTP_STATUS } from '@/constants/http-status';
import { useNavigate, useRouter } from '@tanstack/react-router';

export default function NotFoundError() {
  const navigate = useNavigate();
  const { history } = useRouter();

  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">
          {HTTP_STATUS.NOT_FOUND}
        </h1>
        <span className="font-medium">ページが見つかりません</span>
        <p className="text-center text-muted-foreground">
          お探しのページは存在しないか、削除された可能性があります。
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => history.go(-1)}>
            前のページへ戻る
          </Button>
          <Button onClick={() => navigate({ to: '/' })}>ホームへ戻る</Button>
        </div>
      </div>
    </div>
  );
}
