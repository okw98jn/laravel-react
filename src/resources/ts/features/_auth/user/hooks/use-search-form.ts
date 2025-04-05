import { useFilter } from '@/features/_auth/hooks/use-filter';
import {
  type SearchSchemaType,
  searchSchema,
} from '@/features/_auth/user/schema/search';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function useSearchForm() {
  const { filters, setFilters, resetFilters } = useFilter('/_auth/user/');

  const defaultValues: SearchSchemaType = {
    id: filters.id,
    name: filters.name,
    email: filters.email,
    status: filters.status,
    sort: filters.sort,
    pageIndex: filters.pageIndex,
    pageSize: filters.pageSize,
  };

  const form = useForm<SearchSchemaType>({
    defaultValues,
    values: defaultValues,
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
