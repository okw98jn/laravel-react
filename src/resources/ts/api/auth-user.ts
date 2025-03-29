import type { User } from '@/features/_auth/types/user';
import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';

interface AuthUserResponseData {
  user: User;
}

// zustandと2重で状態管理をしたくないのでaxiosで取得
export async function fetchAuthUser(): Promise<
  ApiSuccessResponse<AuthUserResponseData>
> {
  return api.get('/auth-user').then((res) => res.data);
}
