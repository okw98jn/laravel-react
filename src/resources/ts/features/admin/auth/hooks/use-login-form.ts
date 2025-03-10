import { useLogin } from '@/features/admin/auth/api/login';
import {
  type LoginSchemaType,
  loginSchema,
} from '@/features/admin/auth/schema/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

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

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onError: (error) => {
        if (error instanceof AxiosError && error.response?.status === 401) {
          form.setError('root', { type: 'manual' });
        }
      },
    });
  });

  return { form, errors, isPending, onSubmit };
};
