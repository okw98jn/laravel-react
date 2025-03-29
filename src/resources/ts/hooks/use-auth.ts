import { fetchAuthUser } from '@/api/auth-user';
import { useAuthStore } from '@/store/auth';
import { useCallback, useEffect, useState } from 'react';

/**
 * 認証関連の機能を提供するカスタムフック
 */
export function useAuth() {
  const { isAuthenticated, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * 認証ユーザー情報を取得する
   */
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetchAuthUser();
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  // コンポーネントがマウントされたときに認証チェックを実行
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { isLoading, isAuthenticated };
}
