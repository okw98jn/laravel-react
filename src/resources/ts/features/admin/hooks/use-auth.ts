import { useAuthStore } from '@/features/admin/store/auth';

export interface AuthData {
  isAuthenticated: boolean;
}

export function useAuth() {
  const { user } = useAuthStore();

  const isAuthenticated = user !== null;

  return { isAuthenticated };
}
