import type { User } from '@/features/_auth/types/user';
import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

interface AuthUserResponseData {
  user: User;
}

async function fetchAuthUser(): Promise<
  ApiSuccessResponse<AuthUserResponseData>
> {
  return api.get('/auth-user');
}

export function useAuthUser() {
  return useQuery({
    queryKey: ['auth-user'],
    queryFn: fetchAuthUser,
  });
}
