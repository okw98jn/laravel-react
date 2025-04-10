import type { ApiErrorResponse } from '@/types/api';
import type { AxiosError } from 'axios';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';

/**
 * APIのバリデーションエラーをフォームエラーに変換する
 *
 * @param error - APIのエラー
 * @param setError - フォームのエラーを設定する関数
 */
export const setApiValidationError = <T extends FieldValues>(
  error: AxiosError,
  setError: UseFormSetError<T>,
): void => {
  const errors = (error.response?.data as ApiErrorResponse)?.error;

  if (errors) {
    for (const [field, message] of Object.entries(errors)) {
      setError(field as Path<T>, { type: 'manual', message });
    }
  }
};
