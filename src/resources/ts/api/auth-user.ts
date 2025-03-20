import type { User } from '@/features/_auth/types/user';
import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export interface AuthUserResponseData {
  user: User;
}

async function fetchAuthUser(): Promise<
  ApiSuccessResponse<AuthUserResponseData>
> {
  return api.get('/auth-user');
}

export function authQueryOptions() {
  return queryOptions({
    queryKey: ['auth-user'],
    queryFn: fetchAuthUser,
  });
}

export function useAuthUser() {
  return useQuery(authQueryOptions());
}
