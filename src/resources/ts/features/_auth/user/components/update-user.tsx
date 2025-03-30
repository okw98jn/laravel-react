import { FormInput } from '@/components/form/form-input';
import { FormInputHidden } from '@/components/form/form-input-hidden';
import { FormPassword } from '@/components/form/form-password';
import { FormRadioGroup } from '@/components/form/form-radio-group';
import { FormSelect } from '@/components/form/form-select';
import { FormTextarea } from '@/components/form/form-textarea';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormModal } from '@/features/_auth/components/modal/form-modal';
import type { User } from '@/features/_auth/types/user';
import { genderOptions } from '@/features/_auth/user/constants/gender';
import { statusOptions } from '@/features/_auth/user/constants/status';
import { useUpdateForm } from '@/features/_auth/user/hooks/use-update-form';
import type { UpdateSchemaType } from '@/features/_auth/user/schema/update';

interface Props {
  user: User;
}

export function UpdateUser({ user }: Props) {
  const { form, isPending, onSubmit, reset, isOpen, setIsOpen } =
    useUpdateForm(user);

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      title="ユーザー編集"
      trigger={
        <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
          編集
        </Button>
      }
      submitButton={
        <Button type="submit" form="update-user" isPending={isPending}>
          保存
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={onSubmit} id="update-user">
          <FormInputHidden<UpdateSchemaType> name="id" />
          <div className="grid grid-cols-1 gap-2">
            <FormInput<UpdateSchemaType>
              name="name"
              label="名前"
              type="text"
              autoComplete="name"
              placeholder="名前を入力してください"
              isRequired
            />
            <FormInput<UpdateSchemaType>
              name="email"
              label="メールアドレス"
              type="text"
              autoComplete="email"
              placeholder="メールアドレスを入力してください"
              isRequired
            />
            <FormPassword<UpdateSchemaType>
              name="password"
              label="パスワード"
              placeholder="パスワードを入力してください"
              autoComplete="new-password"
              isRequired
            />
            <FormSelect<UpdateSchemaType>
              name="status"
              label="ステータス"
              options={statusOptions}
              placeholder="ステータスを選択してください"
              isRequired
            />
            <FormRadioGroup<UpdateSchemaType>
              name="gender"
              label="性別"
              options={genderOptions}
              isRequired
            />
            <FormTextarea<UpdateSchemaType>
              name="memo"
              label="メモ"
              placeholder="メモを入力してください"
            />
          </div>
        </form>
      </Form>
    </FormModal>
  );
}
