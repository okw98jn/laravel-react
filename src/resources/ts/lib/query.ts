import { HTTP_STATUS } from '@/constants/http-status';
import { type DefaultOptions, QueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

const defaultQueryConfig = {
  queries: {
    retry(failureCount, error) {
      const RETRY_COUNT = 3;

      if (failureCount === RETRY_COUNT) return false;

      // 400番台のエラーはリトライしない
      if (
        error.response?.status &&
        error.response.status < HTTP_STATUS.INTERNAL_SERVER_ERROR
      ) {
        return false;
      }

      return true;
    },
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
