import { type DefaultOptions, QueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

const defaultQueryConfig = {
  queries: {
    throwOnError: true,
  },
} satisfies DefaultOptions;

export const queryClient = new QueryClient({
  defaultOptions: defaultQueryConfig,
});

declare module '@tanstack/react-query' {
  interface Register {
    // デフォルトのエラー型をAxiosErrorに変更
    defaultError: AxiosError;
  }
}
