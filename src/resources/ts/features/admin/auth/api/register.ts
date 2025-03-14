import type { RegisterSchemaType } from '@/features/admin/auth/schema/register';
import type { User } from '@/features/admin/types/user';
import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

export interface RegisterResponseData {
  user: User;
}

async function register(
  formData: RegisterSchemaType,
): Promise<ApiSuccessResponse<RegisterResponseData>> {
  return api.post('/admin/register', formData);
}

export function useRegister() {
  return useMutation({
    mutationFn: (formData: RegisterSchemaType) => register(formData),
  });
}
