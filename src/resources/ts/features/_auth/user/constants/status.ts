import { toSelectOptions } from '@/utils/select';

export const status = {
  invalid: {
    value: 1,
    label: '無効',
  },
  valid: {
    value: 2,
    label: '有効',
  },
} as const;

export const statusOptions = toSelectOptions(status);
