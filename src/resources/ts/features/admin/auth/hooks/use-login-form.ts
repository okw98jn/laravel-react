import {
  type LoginSchemaType,
  loginSchema,
} from '@/features/admin/auth/schema/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useLoginForm = () => {
  const defaultValues: LoginSchemaType = {
    email: '',
    password: '',
  };

  const form = useForm<LoginSchemaType>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    console.log(data);
  };

  return {
    form,
    onSubmit,
  };
};
