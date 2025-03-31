import { useFilter } from '@/features/_auth/hooks/use-filter';
import { sort } from '@/features/_auth/user/constants/sort';
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
    status: [],
    sort: sort.id.value,
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

  const handleSortChange = (value: string) => {
    const currentValues = form.getValues();
    setFilters({ ...currentValues, sort: value });
  };

  return { form, onSubmit, handleClear, handleSortChange };
}
