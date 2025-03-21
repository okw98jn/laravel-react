import {
  type CreateSchemaType,
  createSchema,
} from '@/features/_auth/user/schema/create';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function useCreateForm() {
  const defaultValues: CreateSchemaType = {
    name: '',
    email: '',
    memo: '',
    // status: '0',
  };

  const form = useForm<CreateSchemaType>({
    defaultValues,
    resolver: zodResolver(createSchema),
  });

  const { reset } = form;

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return { form, onSubmit, reset };
}
