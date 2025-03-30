import { HTTP_STATUS } from '@/constants/http-status';
import axios, { type AxiosError } from 'axios';
import humps from 'humps';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use((request) => {
  // スネークケースに変換
  // request.data = humps.decamelizeKeys(request.data);
  request.params = humps.decamelizeKeys(request.params);
  return request;
});

api.interceptors.response.use(
  (response) => {
    // キャメルケースに変換
    if (response.data && !(response.data instanceof Blob)) {
      response.data = humps.camelizeKeys(response.data);
    }
    return response;
  },
  (error) => {
    // APIの使用側でエラーを処理するためここでは何もしない
    return Promise.reject(error);
  },
);

/**
 * 認証エラーかどうかを判定する
 *
 * @param error - エラー
 * @returns 認証エラーかどうか
 */
export const isUnauthorizedError = (error: AxiosError): boolean => {
  return error.response?.status === HTTP_STATUS.UNAUTHORIZED;
};

/**
 * バリデーションエラーかどうかを判定する
 *
 * @param error - エラー
 * @returns バリデーションエラーかどうか
 */
export const isValidationError = (error: AxiosError): boolean => {
  return error.response?.status === HTTP_STATUS.UNPROCESSABLE_ENTITY;
};
