import type { User } from '@/features/admin/types/user';
import type { SearchSchemaType } from '@/features/admin/user/schema/search';
import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

export interface UsersResponseData {
  users: User[];
}

async function fetchUsers(
  filters: SearchSchemaType,
): Promise<ApiSuccessResponse<UsersResponseData>> {
  return api.get('/admin/users', {
    params: {
      id: filters.id,
      name: filters.name,
      email: filters.email,
    },
  });
}

export function useUsers(filters: SearchSchemaType) {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => fetchUsers(filters),
  });
}
