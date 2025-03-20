import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

export interface LogoutResponse extends ApiSuccessResponse<void> {}

async function logout(): Promise<LogoutResponse> {
  return api.post('/logout');
}

export function useLogout() {
  return useMutation({
    mutationFn: () => logout(),
  });
}
