import { FormInput } from '@/components/form/form-input';
import { FormPassword } from '@/components/form/form-password';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Footer } from '@/features/_guest/components/footer';
import { Header } from '@/features/_guest/components/header';
import { Separator } from '@/features/_guest/components/separator';
import { SocialLogin } from '@/features/_guest/components/social-login';
import { useRegisterForm } from '@/features/_guest/hooks/use-register-form';
import type { RegisterSchemaType } from '@/features/_guest/schema/register';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest/register')({
  component: RouteComponent,
});

function RouteComponent() {
  const { form, isPending, onSubmit } = useRegisterForm();

  return (
    <>
      <Header text="新規登録" />
      <div className="w-96 mx-auto space-y-4">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
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
      <Footer text="ログインは" to="/login" />
    </>
  );
}
