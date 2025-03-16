import { FormInput } from '@/components/form/form-input';
import { Form } from '@/components/ui/form';
import { ButtonGroup } from '@/features/admin/components/search/button-group';
import { Card } from '@/features/admin/components/search/card';
import { useSearchForm } from '@/features/admin/user/hooks/use-search-form';
import type { SearchSchemaType } from '@/features/admin/user/schema/search';

export function SearchForm() {
  const { form, onSubmit, handleClear } = useSearchForm();

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
          </div>
          <ButtonGroup handleClear={handleClear} />
        </form>
      </Form>
    </Card>
  );
}
