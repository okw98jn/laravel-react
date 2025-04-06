import type { SuggestData } from '@/features/_auth/types/suggest';
import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

export interface SuggestUsersResponseData {
  results: SuggestData[];
}

async function suggestUsers(
  keyword: string,
): Promise<ApiSuccessResponse<SuggestUsersResponseData>> {
  return api
    .get('/users/suggest', {
      params: { keyword },
    })
    .then((res) => res.data);
}

export function useSuggestUsers(keyword: string) {
  return useQuery({
    queryKey: ['suggest-users', keyword],
    queryFn: () => suggestUsers(keyword),
  });
}
