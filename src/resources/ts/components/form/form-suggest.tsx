import { RequiredMark } from '@/components/required-mark';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { Option } from '@/utils/options';
import { AlertCircle, Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface Props<S> {
  name: keyof S & string;
  label?: string;
  options: Option[];
  placeholder?: string;
  isRequired?: boolean;
  onInputChange?: (value: string) => void;
  isPending?: boolean;
  isError?: boolean;
}

export function FormSuggest<S>({
  name,
  label,
  options,
  placeholder,
  isRequired,
  onInputChange,
  isPending,
  isError,
}: Props<S>) {
  const form = useFormContext();

  const handleInputChange = (value: string) => {
    if (value.length > 100) {
      return;
    }

    if (onInputChange) {
      onInputChange(value);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && (
            <FormLabel>
              {label}
              {isRequired && <RequiredMark />}
            </FormLabel>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  // biome-ignore lint/a11y/useSemanticElements: <select>
                  role="combobox"
                  className={cn(
                    'w-full justify-between',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value ? (
                    options.find((option) => option.value === field.value)
                      ?.label
                  ) : (
                    <span className="text-muted-foreground">{placeholder}</span>
                  )}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput
                  placeholder={placeholder}
                  className="h-9"
                  onValueChange={handleInputChange}
                  maxLength={100}
                />
                <CommandList>
                  {isPending && (
                    <div className="flex items-center justify-center p-5.5">
                      <Loader2 className="animate-spin" />
                    </div>
                  )}
                  {isError && (
                    <div className="flex items-center justify-center p-5.5 text-destructive">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      <span className="text-sm">エラーが発生しました</span>
                    </div>
                  )}
                  {!isPending && !isError && (
                    <>
                      <CommandEmpty>データがありません</CommandEmpty>
                      <CommandGroup>
                        {options.map((option) => (
                          <CommandItem
                            className="cursor-pointer"
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              form.setValue(name, option.value as any);
                            }}
                          >
                            {option.label}
                            <Check
                              className={cn(
                                'ml-auto',
                                option.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
