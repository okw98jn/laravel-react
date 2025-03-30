import { FormInput } from '@/components/form/form-input';
import { FormPassword } from '@/components/form/form-password';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Footer } from '@/features/_guest/components/footer';
import { Header } from '@/features/_guest/components/header';
import { LoginFailedMessage } from '@/features/_guest/components/login-failed-message';
import { Separator } from '@/features/_guest/components/separator';
import { SocialLogin } from '@/features/_guest/components/social-login';
import { useLoginForm } from '@/features/_guest/hooks/use-login-form';
import type { LoginSchemaType } from '@/features/_guest/schema/login';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest/login')({
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
            <FormInput<LoginSchemaType>
              name="email"
              label="メールアドレス"
              type="text"
              autoComplete="email"
              placeholder="example@example.com"
            />
            <FormPassword<LoginSchemaType>
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
      <Footer text="新規登録は" to="/register" />
    </>
  );
}
