import type { User } from '@/features/_auth/types/user';
import { getCsrfCookie } from '@/features/_guest/api/csrf';
import type { LoginSchemaType } from '@/features/_guest/schema/login';
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
  return api.post('/login', formData).then((res) => res.data);
}

export function useLogin() {
  return useMutation({
    mutationFn: (formData: LoginSchemaType) => login(formData),
  });
}
