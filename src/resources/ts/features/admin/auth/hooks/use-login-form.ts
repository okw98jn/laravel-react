import { useLogin } from '@/features/admin/auth/api/login';
import {
  type LoginSchemaType,
  loginSchema,
} from '@/features/admin/auth/schema/login';
import { isUnauthorizedError, isValidationError } from '@/lib/api-client';
import { setApiValidationError } from '@/lib/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const useLoginForm = () => {
  const { mutate, isPending } = useLogin();

  const defaultValues: LoginSchemaType = {
    email: '',
    password: '',
  };

  const form = useForm<LoginSchemaType>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const { errors } = form.formState;

  const handleSuccess = () => {
    const navigate = useNavigate();
    navigate({ to: '/admin' });
    toast.success('ログインしました。');
  };

  const handleError = (error: Error) => {
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

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: handleSuccess,
      onError: handleError,
    });
  });

  return { form, errors, isPending, onSubmit };
};
