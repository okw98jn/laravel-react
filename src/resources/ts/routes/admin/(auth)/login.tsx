import { Input } from '@/components/form/input';
import { Password } from '@/components/form/password';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Footer } from '@/features/admin/auth/components/footer';
import { Header } from '@/features/admin/auth/components/header';
import { Separator } from '@/features/admin/auth/components/separator';
import { SocialAuth } from '@/features/admin/auth/components/social-auth';
import { useLoginForm } from '@/features/admin/auth/login/hooks/use-login-form';
import type { LoginSchemaType } from '@/features/admin/auth/login/schema';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/(auth)/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const { form, onSubmit } = useLoginForm();

  return (
    <>
      <Header text="ログイン" />
      <div className="w-96 mx-auto space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input<LoginSchemaType>
              name="email"
              label="メールアドレス"
              type="email"
              autoComplete="email"
            />
            <Password<LoginSchemaType>
              name="password"
              label="パスワード"
              autoComplete="current-password"
            />
            <Button type="submit" size="full">
              ログイン
            </Button>
          </form>
        </Form>
        <Separator />
        <SocialAuth />
      </div>
      <Footer text="新規登録は" to="/admin/register" />
    </>
  );
}
