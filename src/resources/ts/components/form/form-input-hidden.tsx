import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useId } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props<S> {
  name: keyof S & string;
}

export function FormInputHidden<S>({ name }: Props<S>) {
  const form = useFormContext();
  const uniqueId = useId();
  const inputId = `${name}-${uniqueId}`;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input id={inputId} {...field} type="hidden" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
