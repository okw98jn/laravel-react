import type { User } from '@/features/_auth/types/user';
import type { UpdateSchemaType } from '@/features/_auth/user/schema/update';
import { api } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

export interface UpdateUserResponseData {
  user: User;
}

async function updateUser(
  formData: UpdateSchemaType,
): Promise<ApiSuccessResponse<UpdateUserResponseData>> {
  return api
    .put('/users', {
      id: formData.id,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      status: Number(formData.status),
      gender: Number(formData.gender),
      memo: formData.memo,
    })
    .then((res) => res.data);
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: (formData: UpdateSchemaType) => updateUser(formData),
  });
}
