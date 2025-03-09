import axios from 'axios';

export const getCsrfCookie = async () => {
  await axios.get('/sanctum/csrf-cookie');
};
