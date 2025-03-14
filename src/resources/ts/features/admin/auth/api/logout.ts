import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

export interface LogoutResponse extends ApiSuccessResponse<void> {}

const logout = async (): Promise<LogoutResponse> => {
  return api.post('/admin/logout');
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => logout(),
  });
};
