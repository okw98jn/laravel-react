import { FormCheckbox } from '@/components/form/form-checkbox';
import { FormInput } from '@/components/form/form-input';
import { FormSelect } from '@/components/form/form-select';
import { Form } from '@/components/ui/form';
import { ButtonGroup } from '@/features/_auth/components/search/button-group';
import { Card } from '@/features/_auth/components/search/card';
import { sortOptions } from '@/features/_auth/user/constants/sort';
import { statusOptions } from '@/features/_auth/user/constants/status';
import { useSearchForm } from '@/features/_auth/user/hooks/use-search-form';
import type { SearchSchemaType } from '@/features/_auth/user/schema/search';

export function SearchForm() {
  const { form, onSubmit, handleClear, handleSortChange } = useSearchForm();

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 gap-x-8 mb-4">
            <FormInput<SearchSchemaType> name="id" label="ID" type="number" />
            <FormInput<SearchSchemaType> name="name" label="名前" type="text" />
            <FormInput<SearchSchemaType>
              name="email"
              label="メールアドレス"
              type="text"
            />
            <FormCheckbox<SearchSchemaType>
              name="status"
              label="ステータス"
              options={statusOptions}
            />
            <FormSelect<SearchSchemaType>
              name="sortColumn"
              label="並び順"
              options={sortOptions}
              onValueChange={handleSortChange}
            />
          </div>
          <ButtonGroup handleClear={handleClear} />
        </form>
      </Form>
    </Card>
  );
}
