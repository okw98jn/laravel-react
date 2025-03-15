import {
  type AuthUserResponseData,
  authQueryOptions,
  useAuthUser,
} from '@/features/admin/api/auth-user';
import { useAuthStore } from '@/features/admin/store/auth';
import { queryClient } from '@/lib/query';
import { router } from '@/lib/router';
import type { ApiSuccessResponse } from '@/types/api';
import { useEffect } from 'react';

export interface AuthData {
  isAuthenticated: boolean;
  isPending: boolean;
  fetchData: () =>
    | Promise<ApiSuccessResponse<AuthUserResponseData>>
    | undefined;
}

export function useAuth() {
  const { user, login } = useAuthStore();
  const { data, isPending } = useAuthUser();

  // サーバーから認証ユーザーデータが取得できた場合に実行する副作用
  useEffect(() => {
    if (data?.data.user) {
      // ルーターを更新
      router.invalidate();
      // APIから取得した認証ユーザーをストアに保存
      login(data.data.user);
    }
  }, [data, login]);

  function fetchData() {
    return queryClient.fetchQuery(authQueryOptions());
  }

  // ストアにユーザーが存在するかどうかで判断
  const isAuthenticated = !!user;

  return { isAuthenticated, isPending, fetchData };
}
