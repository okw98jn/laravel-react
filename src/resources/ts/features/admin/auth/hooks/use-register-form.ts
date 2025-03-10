import {
  type RegisterSchemaType,
  registerSchema,
} from '@/features/admin/auth/schema/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useRegisterForm = () => {
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

  return { form };
};
