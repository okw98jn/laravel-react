import { RequiredMark } from '@/components/required-mark';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Upload, X } from 'lucide-react';
import { useId } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

interface Props<S> {
  name: keyof S & string;
  label?: string;
  isRequired?: boolean;
  accept?: string;
}

export function FormFileUpload<S>({
  name,
  label,
  isRequired,
  accept = 'image/*',
}: Props<S>) {
  const form = useFormContext();
  const uniqueId = useId();
  const inputId = `${name}-${uniqueId}`;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: name as string,
  });

  const handleFileChange = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const fileArray = Array.from(newFiles);

    for (const file of fileArray) {
      append({ file });
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          {label && (
            <FormLabel htmlFor={inputId}>
              {label}
              {isRequired && <RequiredMark />}
            </FormLabel>
          )}
          <FormControl>
            <div className="flex flex-col gap-2">
              <label
                htmlFor={inputId}
                className="border-input flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-transparent transition-colors hover:border-ring hover:bg-muted/50"
              >
                <Upload className="mb-1 h-5 w-5" />
                <span className="text-sm">画像をアップロード</span>
                <input
                  id={inputId}
                  type="file"
                  className="hidden"
                  accept={accept}
                  onChange={(e) => handleFileChange(e.target.files)}
                />
              </label>
              {/* プレビュー */}
              {fields.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    プレビュー ({fields.length}枚)
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="relative rounded-lg overflow-hidden border border-border shadow-sm"
                      >
                        <div className="aspect-video bg-muted/30 flex items-center justify-center">
                          <img
                            src={URL.createObjectURL(field.file)}
                            alt={`プレビュー ${index + 1}`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="p-2 bg-muted/10 text-xs">
                          <p
                            className="truncate font-medium"
                            title={field.file.name}
                          >
                            {field.file.name}
                          </p>
                        </div>
                        <p className="absolute top-1 left-2 text-xs text-muted-foreground">
                          {index + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-500 text-white cursor-pointer shadow-sm hover:bg-gray-600 transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
