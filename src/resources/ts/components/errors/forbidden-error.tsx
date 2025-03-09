import { Button } from '@/components/ui/button';
import { HTTP_STATUS } from '@/constants/http-status';
import { useNavigate, useRouter } from '@tanstack/react-router';

export default function ForbiddenError() {
  const navigate = useNavigate();
  const { history } = useRouter();

  return (
    <div className="h-svh w-full">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">
          {HTTP_STATUS.FORBIDDEN}
        </h1>
        <span className="font-medium">アクセスが拒否されました</span>
        <p className="text-center text-muted-foreground">
          このページにアクセスする権限がありません。
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
