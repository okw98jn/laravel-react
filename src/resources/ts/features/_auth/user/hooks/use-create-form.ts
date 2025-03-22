import { useCreateUser } from '@/features/_auth/user/api/create-user';
import {
  type CreateSchemaType,
  createSchema,
} from '@/features/_auth/user/schema/create';
import { isValidationError } from '@/lib/api-client';
import { setApiValidationError } from '@/lib/form';
import { queryClient } from '@/lib/query';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function useCreateForm() {
  const { mutate, isPending } = useCreateUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const defaultValues: CreateSchemaType = {
    name: '',
    email: '',
    memo: '',
    status: 0,
    password: '',
  };

  const form = useForm<CreateSchemaType>({
    defaultValues,
    resolver: zodResolver(createSchema),
  });

  const { reset } = form;

  function handleSuccess() {
    // ユーザー一覧を再取得
    queryClient.invalidateQueries({ queryKey: ['users'] });
    toast.success('ユーザーを作成しました。');
    reset();
    setIsOpen(false);
  }

  function handleError(error: AxiosError) {
    if (isValidationError(error)) {
      setApiValidationError<CreateSchemaType>(error, form.setError);
      return;
    }
    toast.error('ユーザーの作成に失敗しました。');
  }

  const onSubmit = form.handleSubmit((formData) => {
    mutate(formData, {
      onSuccess: () => handleSuccess(),
      onError: (error) => handleError(error),
    });
  });

  return { form, isPending, onSubmit, reset, isOpen, setIsOpen };
}
