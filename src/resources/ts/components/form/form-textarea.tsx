import { RequiredMark } from '@/components/required-mark';
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
  isRequired?: boolean;
}

export function FormTextarea<S>({
  name,
  label,
  isRequired,
  ...props
}: Props<S>) {
  const form = useFormContext();
  const uniqueId = useId();
  const textareaId = `${name}-${uniqueId}`;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel htmlFor={textareaId}>
              {label}
              {isRequired && <RequiredMark />}
            </FormLabel>
          )}
          <FormControl>
            <Textarea id={textareaId} {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
