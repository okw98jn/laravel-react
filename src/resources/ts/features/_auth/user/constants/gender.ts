import { toOptions } from '@/utils/options';

export const gender = {
  male: {
    value: 1,
    label: '男性',
  },
  female: {
    value: 2,
    label: '女性',
  },
} as const;

export const genderOptions = toOptions(gender);
