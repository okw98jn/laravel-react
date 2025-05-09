import { FormFileUpload } from '@/components/form/form-file-upload';
import { FormInput } from '@/components/form/form-input';
import { FormPassword } from '@/components/form/form-password';
import { FormRadioGroup } from '@/components/form/form-radio-group';
import { FormSelect } from '@/components/form/form-select';
import { FormTextarea } from '@/components/form/form-textarea';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormModal } from '@/features/_auth/components/modal/form-modal';
import { genderOptions } from '@/features/_auth/user/constants/gender';
import { statusOptions } from '@/features/_auth/user/constants/status';
import { useCreateForm } from '@/features/_auth/user/hooks/use-create-form';
import type { CreateSchemaType } from '@/features/_auth/user/schema/create';
import { Plus, Trash } from 'lucide-react';

export function CreateUser() {
  const {
    form,
    isPending,
    onSubmit,
    reset,
    isOpen,
    setIsOpen,
    fields,
    append,
    remove,
  } = useCreateForm();

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      title="ユーザー新規作成"
      trigger={
        <Button onClick={() => setIsOpen(true)}>
          <Plus />
          新規作成
        </Button>
      }
      submitButton={
        <Button type="submit" form="create-user" isPending={isPending}>
          保存
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={onSubmit} id="create-user">
          <div className="grid grid-cols-1 gap-2">
            <FormInput<CreateSchemaType>
              name="name"
              label="名前"
              type="text"
              autoComplete="name"
              placeholder="名前を入力してください"
              isRequired
            />
            <FormInput<CreateSchemaType>
              name="email"
              label="メールアドレス"
              type="text"
              autoComplete="email"
              placeholder="メールアドレスを入力してください"
              isRequired
            />
            <FormPassword<CreateSchemaType>
              name="password"
              label="パスワード"
              placeholder="パスワードを入力してください"
              autoComplete="new-password"
              isRequired
            />
            <FormSelect<CreateSchemaType>
              name="status"
              label="ステータス"
              options={statusOptions}
              placeholder="ステータスを選択してください"
              isRequired
            />
            <FormRadioGroup<CreateSchemaType>
              name="gender"
              label="性別"
              options={genderOptions}
              isRequired
            />
            <FormTextarea<CreateSchemaType>
              name="memo"
              label="メモ"
              placeholder="メモを入力してください"
            />
            <FormFileUpload<CreateSchemaType> name="images" label="画像" />
            <div className="grid grid-cols-1 gap-2">
              {fields.map((field, index) => (
                <div key={field.id}>
                  <FormInput<CreateSchemaType>
                    name={`items.${index}.name`}
                    label="名前"
                    isRequired
                  />
                  <FormInput<CreateSchemaType>
                    name={`items.${index}.memo`}
                    label="メモ"
                    isRequired
                  />
                  {index === fields.length - 1 && index < 3 && (
                    <Button
                      type="button"
                      onClick={() => append({ name: '', memo: '' })}
                    >
                      <Plus />
                    </Button>
                  )}
                  {index > 0 && (
                    <Button type="button" onClick={() => remove(index)}>
                      <Trash />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </form>
      </Form>
    </FormModal>
  );
}
