import {
  type RegisterResponseData,
  useRegister,
} from '@/features/_guest/api/register';
import {
  type RegisterSchemaType,
  registerSchema,
} from '@/features/_guest/schema/register';
import { isValidationError } from '@/lib/api-client';
import { setApiValidationError } from '@/lib/form';
import { useAuthStore } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function useRegisterForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister();
  const { login } = useAuthStore();

  const defaultValues: RegisterSchemaType = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const form = useForm<RegisterSchemaType>({
    defaultValues,
    resolver: zodResolver(registerSchema),
  });

  function handleSuccess(data: RegisterResponseData) {
    login(data.user);
    navigate({ to: '/' });
    toast.success('新規登録が完了しました。');
  }

  function handleError(error: AxiosError) {
    if (isValidationError(error)) {
      setApiValidationError<RegisterSchemaType>(error, form.setError);
      return;
    }
    toast.error('新規登録に失敗しました。');
  }

  const onSubmit = form.handleSubmit((formData) => {
    mutate(formData, {
      onSuccess: (data) => handleSuccess(data.data),
      onError: (error) => handleError(error),
    });
  });

  return { form, isPending, onSubmit };
}
