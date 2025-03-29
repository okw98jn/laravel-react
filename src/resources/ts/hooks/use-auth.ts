import { fetchAuthUser } from '@/api/auth-user';
import { useAuthStore } from '@/store/auth';
import { useEffect } from 'react';

/**
 * 認証関連の機能を提供するカスタムフック
 */
export function useAuth() {
  const { isAuthenticated, isLoading, setUser, setLoading } = useAuthStore();

  /**
   * 認証ユーザー情報を取得する
   */
  const fetchUser = async () => {
    setLoading(true);

    try {
      const res = await fetchAuthUser();
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 初期化時に認証ユーザー情報を取得する
   */
  const initAuth = () => {
    useEffect(() => {
      fetchUser();
    }, []);
  };

  /**
   * 認証が必要なルートのガード
   * @returns 認証が完了していない場合はnull、非認証の場合はfalse、認証済みの場合はtrue
   */
  const requireAuth = () => {
    if (isLoading) {
      return null;
    }

    return isAuthenticated;
  };

  /**
   * ゲストのみアクセス可能なルートのガード
   * @returns 認証が完了していない場合はnull、認証済みの場合はfalse、非認証の場合はtrue
   */
  const requireGuest = () => {
    if (isLoading) {
      return null;
    }

    return !isAuthenticated;
  };

  return { initAuth, requireAuth, requireGuest };
}
