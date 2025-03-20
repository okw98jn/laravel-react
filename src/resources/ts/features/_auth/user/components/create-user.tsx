import { FormInput } from '@/components/form/form-input';
import { FormTextarea } from '@/components/form/form-textarea';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormModal } from '@/features/_auth/components/modal/form-modal';
import { useCreateForm } from '@/features/_auth/user/hooks/use-create-form';
import type { CreateSchemaType } from '@/features/_auth/user/schema/create';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export function CreateUser() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { form, onSubmit, reset } = useCreateForm();

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      title="新規作成"
      trigger={
        <Button onClick={() => setIsOpen(true)}>
          <Plus />
          新規作成
        </Button>
      }
      submitButton={
        <Button type="submit" form="create-user">
          保存
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={onSubmit} id="create-user">
          <div className="grid grid-cols-1 gap-2">
            <FormInput<CreateSchemaType> name="name" label="名前" type="text" />
            <FormInput<CreateSchemaType>
              name="email"
              label="メールアドレス"
              type="text"
            />
            <FormTextarea<CreateSchemaType> name="memo" label="メモ" />
          </div>
        </form>
      </Form>
    </FormModal>
  );
}
