import { api } from '@/lib/api-client';
import { queryClient } from '@/lib/query';
import type { ApiSuccessResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

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
    onSuccess: () => {
      toast.success('ユーザーを削除しました');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.error('ユーザーの削除に失敗しました');
    },
  });
}
