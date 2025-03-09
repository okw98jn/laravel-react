import { Button } from '@/components/ui/button';
import { HTTP_STATUS } from '@/constants/http-status';
import { useNavigate, useRouter } from '@tanstack/react-router';

export default function GeneralError() {
  const navigate = useNavigate();
  const { history } = useRouter();

  return (
    <div className="h-svh w-full">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">
          {HTTP_STATUS.INTERNAL_SERVER_ERROR}
        </h1>
        <span className="font-medium">システムエラーが発生しました</span>
        <p className="text-center text-muted-foreground">
          現在、一時的な障害が発生しております。
          <br />
          ご迷惑をおかけし申し訳ございません。
          <br />
          しばらく時間をおいて再度お試しください。
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
