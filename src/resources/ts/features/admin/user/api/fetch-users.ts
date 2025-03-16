import type { User } from '@/features/admin/types/user';
import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

export interface UsersResponseData {
  users: User[];
}

async function fetchUsers(): Promise<ApiSuccessResponse<UsersResponseData>> {
  return api.get('/admin/users');
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
}
