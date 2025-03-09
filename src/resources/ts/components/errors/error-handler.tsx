import ForbiddenError from '@/components/errors/forbidden-error';
import GeneralError from '@/components/errors/general-error';
import Unauthorized from '@/components/errors/unauthorized';
import { HTTP_STATUS } from '@/constants/http-status';
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
      case HTTP_STATUS.UNAUTHORIZED:
      case HTTP_STATUS.EXPIRED_SESSION:
        return <Unauthorized />;
      case HTTP_STATUS.FORBIDDEN:
        return <ForbiddenError />;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return <GeneralError />;
      default:
        return <GeneralError />;
    }
  }

  // その他のエラー
  return <GeneralError />;
}
