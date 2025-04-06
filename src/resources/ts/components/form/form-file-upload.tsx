import { RequiredMark } from '@/components/required-mark';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Upload, X } from 'lucide-react';
import { useId, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface FilePreview {
  url: string;
  id: string;
  name: string;
  size: number;
}

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

  const [previewUrls, setPreviewUrls] = useState<FilePreview[]>([]);

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);

    const newPreviewUrls = fileArray.map((file) => ({
      url: URL.createObjectURL(file),
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: file.size,
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
                className="border-input flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-transparent transition-colors hover:border-ring hover:bg-muted/50"
              >
                <Upload className="mb-1 h-5 w-5" />
                <span className="text-sm">画像をアップロード</span>
                <input
                  id={inputId}
                  type="file"
                  className="hidden"
                  accept={accept}
                  onChange={(e) => {
                    const files = e.target.files;
                    handleFileChange(files);
                    const filesArray = files ? Array.from(files) : [];
                    onChange(filesArray);
                  }}
                  {...field}
                />
              </label>
              {previewUrls.length > 0 && (
                <FilePreview
                  previewUrls={previewUrls}
                  removeFile={removeFile}
                />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface FilePreviewProps {
  previewUrls: FilePreview[];
  removeFile: (index: number) => void;
}

const FilePreview = ({ previewUrls, removeFile }: FilePreviewProps) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">
        プレビュー ({previewUrls.length}枚)
      </h4>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {previewUrls.map((preview, index) => (
          <div
            key={preview.id}
            className="relative rounded-lg overflow-hidden border border-border shadow-sm"
          >
            <div className="aspect-video bg-muted/30 flex items-center justify-center">
              <img
                src={preview.url}
                alt={`プレビュー ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-2 bg-muted/10 text-xs">
              <p className="truncate font-medium" title={preview.name}>
                {preview.name}
              </p>
            </div>
            <p className="absolute top-1 left-2 text-xs text-muted-foreground">
              {index + 1}
            </p>
            <button
              type="button"
              onClick={() => removeFile(index)}
              className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-500 text-white cursor-pointer shadow-sm hover:bg-gray-600 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
