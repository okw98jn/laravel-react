import { getCsrfCookie } from '@/features/admin/auth/api/csrf';
import type { LoginSchemaType } from '@/features/admin/auth/schema/login';
import type { User } from '@/features/admin/types/user';
import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

export interface LoginResponse extends ApiSuccessResponse<User> {}

const login = async (formData: LoginSchemaType): Promise<LoginResponse> => {
  await getCsrfCookie();

  return api.post('/admin/login', formData);
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (formData: LoginSchemaType) => login(formData),
  });
};
