import type { DefaultOptions } from '@tanstack/react-query';

export const defaultQueryConfig = {
  queries: {
    throwOnError: true,
  },
  mutations: {
    throwOnError: true,
  },
} satisfies DefaultOptions;
