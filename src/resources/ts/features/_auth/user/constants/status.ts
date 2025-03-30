import { toOptions } from '@/utils/options';

export const status = {
  temporary: {
    value: 1,
    label: '仮登録',
  },
  active: {
    value: 2,
    label: '本登録',
  },
  withdrawn: {
    value: 3,
    label: '退会',
  },
} as const;

export const statusOptions = toOptions(status);
