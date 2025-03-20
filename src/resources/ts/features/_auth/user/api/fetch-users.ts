import type { User } from '@/features/_auth/types/user';
import type { SearchSchemaType } from '@/features/_auth/user/schema/search';
import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export interface UsersResponseData {
  users: User[];
  rowCount: number;
}

async function fetchUsers(
  filters: SearchSchemaType,
): Promise<ApiSuccessResponse<UsersResponseData>> {
  return api.get('/users', {
    params: {
      id: filters.id,
      name: filters.name,
      email: filters.email,
      pageIndex: filters.pageIndex,
      pageSize: filters.pageSize,
    },
  });
}

export function useUsers(filters: SearchSchemaType) {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => fetchUsers(filters),
    placeholderData: keepPreviousData,
  });
}
