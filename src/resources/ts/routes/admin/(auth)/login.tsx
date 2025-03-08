import { Footer } from '@/features/admin/auth/components/footer';
import { Header } from '@/features/admin/auth/components/header';
import { Separator } from '@/features/admin/auth/components/separator';
import { SocialAuth } from '@/features/admin/auth/components/social-auth';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/(auth)/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header text="ログイン" />
      <div className="w-96 mx-auto">
        <Separator />
        <SocialAuth />
      </div>
      <Footer text="新規登録は" to="/admin/register" />
    </>
  );
}
