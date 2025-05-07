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
  const form = new FormData();
  form.append('name', formData.name);
  form.append('email', formData.email);
  form.append('password', formData.password);
  form.append('status', String(formData.status));
  form.append('gender', String(formData.gender));

  formData.items.forEach((item, i) => {
    form.append(`items[${i}][name]`, item.name);
    form.append(`items[${i}][memo]`, item.memo);
  });

  if (formData.memo) {
    form.append('memo', formData.memo);
  }

  if (formData.images && formData.images.length > 0) {
    formData.images.forEach((image, index) => {
      form.append(`images[${index}]`, image);
    });
  }

  return api
    .post('/users', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}

export function useCreateUser() {
  return useMutation({
    mutationFn: (formData: CreateSchemaType) => createUser(formData),
  });
}
