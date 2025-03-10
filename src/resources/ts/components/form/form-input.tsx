import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input as InputComponent } from '@/components/ui/input';
import type { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props<S> extends InputHTMLAttributes<HTMLInputElement> {
  name: keyof S & string;
  label?: string;
}

export function FormInput<S>({ name, label, ...props }: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <FormControl>
            <InputComponent id={name} {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
