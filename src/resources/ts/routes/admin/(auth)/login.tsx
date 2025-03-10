import { Input } from '@/components/form/input';
import { Password } from '@/components/form/password';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Footer } from '@/features/admin/auth/components/footer';
import { Header } from '@/features/admin/auth/components/header';
import { LoginFailedMessage } from '@/features/admin/auth/components/login-failed-message';
import { Separator } from '@/features/admin/auth/components/separator';
import { SocialLogin } from '@/features/admin/auth/components/social-login';
import { useLoginForm } from '@/features/admin/auth/hooks/use-login-form';
import type { LoginSchemaType } from '@/features/admin/auth/schema/login';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/(auth)/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const { form, errors, isPending, onSubmit } = useLoginForm();

  return (
    <>
      <Header text="ログイン" />
      <div className="w-96 mx-auto space-y-4">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input<LoginSchemaType>
              name="email"
              label="メールアドレス"
              type="email"
              autoComplete="email"
              placeholder="example@example.com"
            />
            <Password<LoginSchemaType>
              name="password"
              label="パスワード"
              autoComplete="current-password"
              placeholder="********"
            />
            <Button type="submit" size="full" isPending={isPending}>
              ログイン
            </Button>
          </form>
        </Form>
        {errors.root && (
          <LoginFailedMessage
            title="ログイン失敗"
            message="メールアドレスかパスワードが間違っています。"
          />
        )}
        <Separator />
        <SocialLogin />
      </div>
      <Footer text="新規登録は" to="/admin/register" />
    </>
  );
}
