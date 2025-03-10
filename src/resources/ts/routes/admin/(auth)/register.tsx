import { FormInput } from '@/components/form/form-input';
import { FormPassword } from '@/components/form/form-password';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useRegister } from '@/features/admin/auth/api/register';
import { Footer } from '@/features/admin/auth/components/footer';
import { Header } from '@/features/admin/auth/components/header';
import { Separator } from '@/features/admin/auth/components/separator';
import { SocialLogin } from '@/features/admin/auth/components/social-login';
import { useRegisterForm } from '@/features/admin/auth/hooks/use-register-form';
import type { RegisterSchemaType } from '@/features/admin/auth/schema/register';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/(auth)/register')({
  component: RouteComponent,
});

function RouteComponent() {
  const { form } = useRegisterForm();
  const { mutate, isPending } = useRegister();

  return (
    <>
      <Header text="新規登録" />
      <div className="w-96 mx-auto space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className="space-y-4"
          >
            <FormInput<RegisterSchemaType>
              name="name"
              label="名前"
              autoComplete="name"
              placeholder="山田太郎"
            />
            <FormInput<RegisterSchemaType>
              name="email"
              label="メールアドレス"
              type="email"
              autoComplete="email"
              placeholder="example@example.com"
            />
            <FormPassword<RegisterSchemaType>
              name="password"
              label="パスワード"
              autoComplete="current-password"
              placeholder="********"
            />
            <FormPassword<RegisterSchemaType>
              name="password_confirmation"
              label="パスワード（確認）"
              autoComplete="new-password"
              placeholder="********"
            />
            <Button type="submit" size="full" isPending={isPending}>
              新規登録
            </Button>
          </form>
        </Form>
        <Separator />
        <SocialLogin />
      </div>
      <Footer text="ログインは" to="/admin/login" />
    </>
  );
}
