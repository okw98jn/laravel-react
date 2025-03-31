import { toOptions } from '@/utils/options';

export const sort = {
  id: {
    label: 'ID',
    value: 'id',
  },
  name: {
    label: '名前',
    value: 'name',
  },
  email: {
    label: 'メールアドレス',
    value: 'email',
  },
} as const;

export const sortOptions = toOptions(sort);
