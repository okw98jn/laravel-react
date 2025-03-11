import { getCsrfCookie } from '@/features/admin/auth/api/csrf';
import type { LoginSchemaType } from '@/features/admin/auth/schema/login';
import { api } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (formData: LoginSchemaType) => {
      await getCsrfCookie();

      return api.post('/admin/login', formData);
    },
  });
};
