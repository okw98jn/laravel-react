import { api } from '@/lib/api-client';
import type { AuthUser } from '@/store/auth';
import type { ApiSuccessResponse } from '@/types/api';

interface AuthUserResponseData {
  user: AuthUser;
}

// zustandと2重で状態管理をしたくないのでaxiosで取得
export async function fetchAuthUser(): Promise<
  ApiSuccessResponse<AuthUserResponseData>
> {
  return api.get('/auth-user').then((res) => res.data);
}
//
