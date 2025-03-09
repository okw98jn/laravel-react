import { api } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import type { RegisterSchemaType } from '../schema/register';

export const useRegister = () => {
  return useMutation({
    mutationFn: (formData: RegisterSchemaType) =>
      api.post('/admin/register', formData),
  });
};
