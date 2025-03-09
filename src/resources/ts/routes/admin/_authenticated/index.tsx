import { Button } from '@/components/ui/button';
import { api } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async () => {
      return api.post('/admin/logout');
    },
    onSuccess: () => {
      navigate({ to: '/admin/login' });
      toast.success('ログアウトしました。');
    },
  });

  return (
    <div>
      <Button onClick={() => mutate()}>Logout</Button>
    </div>
  );
}
