import type { User } from '@/features/_auth/types/user';
import type { CreateSchemaType } from '@/features/_auth/user/schema/create';
import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

export interface CreateUserResponseData {
  user: User;
}

async function createUser(
  formData: CreateSchemaType,
): Promise<ApiSuccessResponse<CreateUserResponseData>> {
  return api
    .post('/users', {
      name: formData.name,
      email: formData.email,
      memo: formData.memo,
      status: Number(formData.status),
      password: formData.password,
      gender: 1,
    })
    .then((res) => res.data);
}

export function useCreateUser() {
  return useMutation({
    mutationFn: (formData: CreateSchemaType) => createUser(formData),
  });
}
