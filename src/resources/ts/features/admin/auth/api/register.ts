import type { RegisterSchemaType } from '@/features/admin/auth/schema/register';
import { api } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';

export const useRegister = () => {
  return useMutation({
    mutationFn: (formData: RegisterSchemaType) =>
      api.post('/admin/register', formData),
  });
};
