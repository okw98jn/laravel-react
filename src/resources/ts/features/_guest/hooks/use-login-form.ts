import { type LoginResponseData, useLogin } from '@/features/_guest/api/login';
import {
  type LoginSchemaType,
  loginSchema,
} from '@/features/_guest/schema/login';
import { isUnauthorizedError, isValidationError } from '@/lib/api-client';
import { setApiValidationError } from '@/lib/form';
import { useAuthStore } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function useLoginForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();
  const { login } = useAuthStore();

  const defaultValues: LoginSchemaType = {
    email: '',
    password: '',
  };

  const form = useForm<LoginSchemaType>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const { errors } = form.formState;

  function handleSuccess(data: LoginResponseData) {
    login(data.user);
    navigate({ to: '/' });
    toast.success('ログインしました。');
  }

  function handleError(error: AxiosError) {
    if (isUnauthorizedError(error)) {
      form.setError('root', { type: 'manual' });
      return;
    }

    if (isValidationError(error)) {
      setApiValidationError<LoginSchemaType>(error, form.setError);
      return;
    }

    toast.error('ログインに失敗しました。');
  }

  const onSubmit = form.handleSubmit((formData) => {
    mutate(formData, {
      onSuccess: (data) => handleSuccess(data.data),
      onError: (error) => handleError(error),
    });
  });

  return { form, errors, isPending, onSubmit };
}
