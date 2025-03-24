import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

async function deleteUsers(ids: number[]): Promise<ApiSuccessResponse<void>> {
  return api
    .delete('/users', {
      data: {
        ids,
      },
    })
    .then((res) => res.data);
}

export function useDeleteUsers() {
  return useMutation({
    mutationFn: (ids: number[]) => deleteUsers(ids),
  });
}
