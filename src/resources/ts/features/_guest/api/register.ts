import type { User } from '@/features/_auth/types/user';
import type { RegisterSchemaType } from '@/features/_guest/schema/register';
import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

export interface RegisterResponseData {
  user: User;
}

async function register(
  formData: RegisterSchemaType,
): Promise<ApiSuccessResponse<RegisterResponseData>> {
  return api.post('/register', formData).then((res) => res.data);
}

export function useRegister() {
  return useMutation({
    mutationFn: (formData: RegisterSchemaType) => register(formData),
  });
}
