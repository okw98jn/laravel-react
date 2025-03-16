import { useFilter } from '@/features/admin/hooks/use-filter';
import {
  type SearchSchemaType,
  searchSchema,
} from '@/features/admin/user/schema/search';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function useSearchForm() {
  const { setFilters, resetFilters } = useFilter('/admin/_authenticated/user/');

  const defaultValues: SearchSchemaType = {
    id: '',
    name: '',
    email: '',
  };

  const form = useForm<SearchSchemaType>({
    defaultValues,
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    setFilters(data);
  });

  const handleClear = () => {
    form.reset(defaultValues);
    resetFilters();
  };

  return { form, onSubmit, handleClear };
}
