import ForbiddenError from '@/components/errors/forbidden-error';
import GeneralError from '@/components/errors/general-error';
import Unauthorized from '@/components/errors/unauthorized';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import NProgress from 'nprogress';
import { useEffect } from 'react';

interface Props {
  error: ErrorComponentProps;
}

export default function ErrorHandler({ error }: Props) {
  useEffect(() => {
    // スピナーを非表示
    NProgress.done();
  }, []);

  // APIエラー
  if (error.error instanceof AxiosError) {
    switch (error.error.response?.status) {
      case 401:
      case 419:
        return <Unauthorized />;
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
