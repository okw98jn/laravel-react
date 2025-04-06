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
      password: formData.password,
      status: Number(formData.status),
      gender: Number(formData.gender),
      memo: formData.memo,
      images: formData.images,
    })
    .then((res) => res.data);
}

export function useCreateUser() {
  return useMutation({
    mutationFn: (formData: CreateSchemaType) => createUser(formData),
  });
}
