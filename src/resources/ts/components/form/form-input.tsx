import { RequiredMark } from '@/components/required-mark';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { InputHTMLAttributes } from 'react';
import { useId } from 'react';
import { type Path, useFormContext } from 'react-hook-form';

interface Props<S> extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<S>;
  label?: string;
  isRequired?: boolean;
}

export function FormInput<S>({ name, label, isRequired, ...props }: Props<S>) {
  const form = useFormContext();
  const uniqueId = useId();
  const inputId = `${name}-${uniqueId}`;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel htmlFor={inputId}>
              {label}
              {isRequired && <RequiredMark />}
            </FormLabel>
          )}
          <FormControl>
            <Input id={inputId} {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
