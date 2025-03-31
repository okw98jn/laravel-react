import { RequiredMark } from '@/components/required-mark';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Option } from '@/utils/options';
import { useFormContext } from 'react-hook-form';

interface Props<S> {
  name: keyof S & string;
  label?: string;
  options: Option[];
  placeholder?: string;
  isRequired?: boolean;
  onValueChange?: (value: string) => void;
}

export function FormSelect<S>({
  name,
  label,
  options,
  placeholder = '選択してください',
  isRequired,
  onValueChange,
}: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel htmlFor={name}>
              {label}
              {isRequired && <RequiredMark />}
            </FormLabel>
          )}
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              onValueChange?.(value);
            }}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
