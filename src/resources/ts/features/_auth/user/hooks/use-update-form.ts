import type { User } from '@/features/_auth/types/user';
import { useUpdateUser } from '@/features/_auth/user/api/update-user';
import {
  type UpdateSchemaType,
  updateSchema,
} from '@/features/_auth/user/schema/update';
import { isValidationError } from '@/lib/api-client';
import { setApiValidationError } from '@/lib/form';
import { queryClient } from '@/lib/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function useUpdateForm(user: User) {
  const { mutate, isPending } = useUpdateUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const defaultValues: UpdateSchemaType = {
    id: user.id,
    name: user.name,
    email: user.email,
    password: '',
    status: String(user.status),
    gender: String(user.gender),
    memo: user.memo,
  };

  const form = useForm<UpdateSchemaType>({
    defaultValues,
    resolver: zodResolver(updateSchema),
  });

  const { reset } = form;

  const onSubmit = form.handleSubmit((formData) => {
    mutate(formData, {
      onSuccess: () => {
        // ユーザー一覧を再取得
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toast.success('ユーザーを更新しました。');
        reset();
        setIsOpen(false);
      },
      onError: (error) => {
        if (isValidationError(error)) {
          setApiValidationError<UpdateSchemaType>(error, form.setError);
          return;
        }
        toast.error('ユーザーの更新に失敗しました。');
      },
    });
  });

  return { form, isPending, onSubmit, reset, isOpen, setIsOpen };
}
