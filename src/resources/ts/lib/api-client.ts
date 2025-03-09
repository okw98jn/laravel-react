import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use();

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 上位のコンポーネントで例外を処理するためここでは何もしない
    return Promise.reject(error);
  },
);
