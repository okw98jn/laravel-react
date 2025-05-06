import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { usePdfPreview } from '@/hooks/use-pdf-preview';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const Route = createFileRoute('/_auth/user/create')({
  component: RouteComponent,
});

const createSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
});

type CreateSchemaType = z.infer<typeof createSchema>;

function RouteComponent() {
  const form = useForm<CreateSchemaType>({
    defaultValues: {
      name: '',
      email: '',
    },
    resolver: zodResolver(createSchema),
  });

  const { mutate, isPending } = usePdfPreview();

  const onSubmit = form.handleSubmit((formData) => {
    console.log(formData);
  });

  const handlePdfPreview = async () => {
    const formData = form.getValues();

    mutate({
      url: 'users/preview-pdf',
      data: formData,
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={onSubmit} id="create-user">
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
          <div className="flex gap-2 mt-4">
            <Button type="submit">作成</Button>
            <Button
              type="button"
              variant="outline"
              onClick={handlePdfPreview}
              disabled={isPending}
            >
              {isPending ? 'PDFを生成中...' : 'PDFプレビュー'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
