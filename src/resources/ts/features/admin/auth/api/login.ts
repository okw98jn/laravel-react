import { getCsrfCookie } from '@/features/admin/auth/api/csrf';
import type { LoginSchemaType } from '@/features/admin/auth/schema/login';
import type { User } from '@/features/admin/types/user';
import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

export interface LoginResponseData {
  user: User;
}

async function login(
  formData: LoginSchemaType,
): Promise<ApiSuccessResponse<LoginResponseData>> {
  await getCsrfCookie();
  return api.post('/admin/login', formData);
}

export function useLogin() {
  return useMutation({
    mutationFn: (formData: LoginSchemaType) => login(formData),
  });
}
