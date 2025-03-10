import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOff } from 'lucide-react';
import { type InputHTMLAttributes, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props<S> extends InputHTMLAttributes<HTMLInputElement> {
  name: keyof S & string;
  label?: string;
}

export function FormPassword<S>({ name, label, ...props }: Props<S>) {
  const form = useFormContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <FormControl>
            <Input
              id={name}
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              {...field}
              {...props}
            />
          </FormControl>
          <Button
            type="button"
            variant="ghost"
            className="absolute top-[23px] right-0 px-1 py-2 hover:bg-transparent"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <p className="hover:bg-gray-100 p-1.5 rounded-full">
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </p>
          </Button>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
