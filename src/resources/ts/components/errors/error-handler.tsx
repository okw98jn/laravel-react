import ForbiddenError from '@/components/errors/forbidden-error';
import GeneralError from '@/components/errors/general-error';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import NProgress from 'nprogress';

interface Props {
  error: ErrorComponentProps;
}

export default function ErrorHandler({ error }: Props) {
  // スピナーを非表示
  NProgress.done();

  // APIエラー
  if (error.error instanceof AxiosError) {
    switch (error.error.response?.status) {
      case 401:
        return;
      case 403:
        return <ForbiddenError />;
      case 500:
        return <GeneralError />;
      default:
        return <GeneralError />;
    }
  }

  // その他のエラー
  return <GeneralError />;
}
