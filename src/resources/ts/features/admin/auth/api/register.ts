import type { RegisterSchemaType } from '@/features/admin/auth/schema/register';
import { api } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: RegisterSchemaType) =>
      api.post('/admin/register', formData),
    onSuccess: () => {
      navigate({ to: '/admin' });
      toast.success('新規登録が完了しました。');
    },
  });
};
