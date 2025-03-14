import {
  type LoginResponseData,
  useLogin,
} from '@/features/admin/auth/api/login';
import {
  type LoginSchemaType,
  loginSchema,
} from '@/features/admin/auth/schema/login';
import { useAuthStore } from '@/features/admin/store/auth';
import { isUnauthorizedError, isValidationError } from '@/lib/api-client';
import { setApiValidationError } from '@/lib/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const useLoginForm = () => {
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

  const handleSuccess = (data: LoginResponseData) => {
    login(data.user);
    navigate({ to: '/admin' });
    toast.success('ログインしました。');
  };

  const handleError = (error: AxiosError) => {
    if (isUnauthorizedError(error)) {
      form.setError('root', { type: 'manual' });
      return;
    }

    if (isValidationError(error)) {
      setApiValidationError<LoginSchemaType>(error, form.setError);
      return;
    }

    toast.error('ログインに失敗しました。');
  };

  const onSubmit = form.handleSubmit((formData) => {
    mutate(formData, {
      onSuccess: (data) => handleSuccess(data.data),
      onError: (error) => handleError(error),
    });
  });

  return { form, errors, isPending, onSubmit };
};
