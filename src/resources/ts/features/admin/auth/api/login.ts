import { getCsrfCookie } from '@/features/admin/auth/api/csrf';
import type { LoginSchemaType } from '@/features/admin/auth/schema/login';
import { api } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formData: LoginSchemaType) => {
      await getCsrfCookie();

      return api.post('/admin/login', formData);
    },
    onSuccess: () => {
      navigate({ to: '/admin' });
      toast.success('ログインしました。');
    },
  });
};
