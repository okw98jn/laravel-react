import type { Paginate } from '@/features/_auth/types/paginate';
import type { User } from '@/features/_auth/types/user';
import type { SearchSchemaType } from '@/features/_auth/user/schema/search';
import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export interface UsersResponseData {
  users: User[];
  paginate: Paginate;
}

async function fetchUsers(
  filters: SearchSchemaType,
): Promise<ApiSuccessResponse<UsersResponseData>> {
  return api
    .get('/users', {
      params: {
        id: filters.id,
        name: filters.name,
        email: filters.email,
        sort_column: filters.sortColumn,
        sort_direction: filters.sortDirection,
        status: filters.status,
        page: filters.pageIndex + 1,
        pageSize: filters.pageSize,
      },
    })
    .then((res) => res.data);
}

export function useUsers(filters: SearchSchemaType) {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => fetchUsers(filters),
    placeholderData: keepPreviousData,
  });
}
