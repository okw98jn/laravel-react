import { useLogout } from '@/features/_auth/api/logout';
import { useAuthStore } from '@/store/auth';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

export function useLogoutHandler(): {
  isPending: boolean;
  handleLogout: () => void;
} {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogout();
  const { setUser } = useAuthStore();

  function handleLogout(): void {
    mutate(undefined, {
      onSuccess: () => {
        setUser(null);
        navigate({ to: '/login' });
        toast.success('ログアウトしました。');
      },
      onError: () => {
        toast.error('ログアウトに失敗しました。');
      },
    });
  }

  return { isPending, handleLogout };
}
