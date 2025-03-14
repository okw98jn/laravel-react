import axios from 'axios';

export async function getCsrfCookie() {
  await axios.get('/sanctum/csrf-cookie');
}
