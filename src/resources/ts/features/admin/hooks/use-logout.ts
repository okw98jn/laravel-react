import { useLogout } from '@/features/admin/api/logout';
import { useAuthStore } from '@/features/admin/store/auth';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

export function useLogoutHandler() {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogout();
  const { logout } = useAuthStore();

  function handleLogout() {
    mutate(undefined, {
      onSuccess: () => {
        logout();
        navigate({ to: '/admin/login' });
        toast.success('ログアウトしました。');
      },
      onError: () => {
        toast.error('ログアウトに失敗しました。');
      },
    });
  }

  return { handleLogout, isPending };
}
