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
import { useFormContext } from 'react-hook-form';

interface Props<S> extends InputHTMLAttributes<HTMLInputElement> {
  name: keyof S & string;
  label?: string;
}

export function FormInput<S>({ name, label, ...props }: Props<S>) {
  const form = useFormContext();
  const uniqueId = useId();
  const inputId = `${name}-${uniqueId}`;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel htmlFor={inputId}>{label}</FormLabel>}
          <FormControl>
            <Input id={inputId} {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
