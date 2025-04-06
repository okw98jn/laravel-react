import { RequiredMark } from '@/components/required-mark';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Upload, X } from 'lucide-react';
import { useId, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props<S> {
  name: keyof S & string;
  label?: string;
  isRequired?: boolean;
  accept?: string;
  multiple?: boolean;
}

export function FormFileUpload<S>({
  name,
  label,
  isRequired,
  accept = 'image/*',
  multiple = true,
}: Props<S>) {
  const form = useFormContext();
  const uniqueId = useId();
  const inputId = `${name}-${uniqueId}`;

  const [previewUrls, setPreviewUrls] = useState<
    Array<{ url: string; id: string }>
  >([]);

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const newPreviewUrls = fileArray.map((file) => ({
      url: URL.createObjectURL(file),
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }));

    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeFile = (index: number) => {
    const values = form.getValues(name as string) as File[];
    const newFiles = [...values];
    newFiles.splice(index, 1);
    form.setValue(name as string, newFiles);

    const newPreviewUrls = [...previewUrls];
    URL.revokeObjectURL(newPreviewUrls[index].url);
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
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
                className={cn(
                  'border-input flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-transparent transition-colors',
                  'hover:border-ring hover:bg-muted/50',
                )}
              >
                <Upload className="mb-1 h-5 w-5" />
                <span className="text-sm">画像をアップロード</span>
                <input
                  id={inputId}
                  type="file"
                  className="hidden"
                  accept={accept}
                  multiple={multiple}
                  onChange={(e) => {
                    const files = e.target.files;
                    handleFileChange(files);
                    onChange(multiple ? files : files?.[0]);
                  }}
                  {...field}
                />
              </label>

              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {previewUrls.map((preview, index) => (
                    <div key={preview.id} className="relative">
                      <img
                        src={preview.url}
                        alt={`プレビュー ${index + 1}`}
                        className="w-full rounded-md object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
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
