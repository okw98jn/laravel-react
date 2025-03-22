import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import type { TextareaHTMLAttributes } from 'react';
import { useId } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props<S> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: keyof S & string;
  label?: string;
}

export function FormTextarea<S>({ name, label, ...props }: Props<S>) {
  const form = useFormContext();
  const uniqueId = useId();
  const textareaId = `${name}-${uniqueId}`;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel htmlFor={textareaId}>{label}</FormLabel>}
          <FormControl>
            <Textarea id={textareaId} {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
