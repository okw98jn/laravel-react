import {
  type SearchSchemaType,
  searchSchema,
} from '@/features/admin/user/schema/search';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function useSearchForm() {
  const defaultValues: SearchSchemaType = {
    id: '',
    name: '',
    email: '',
  };

  const form = useForm<SearchSchemaType>({
    defaultValues,
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = form.handleSubmit(() => {
    // TODO: 検索処理
  });

  const handleClear = () => {
    form.reset(defaultValues);
  };

  return { form, onSubmit, handleClear };
}
