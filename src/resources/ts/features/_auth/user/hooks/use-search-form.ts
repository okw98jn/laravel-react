import { useFilter } from '@/features/_auth/hooks/use-filter';
import {
  type SearchSchemaType,
  searchSchema,
} from '@/features/_auth/user/schema/search';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function useSearchForm() {
  const { setFilters, resetFilters } = useFilter('/_auth/user/');

  const defaultValues: SearchSchemaType = {
    id: '',
    name: '',
    email: '',
    pageIndex: 0,
    pageSize: 10,
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
