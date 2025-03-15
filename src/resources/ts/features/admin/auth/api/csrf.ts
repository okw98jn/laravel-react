import axios from 'axios';

export async function getCsrfCookie() {
  // APIを叩くだけでいいのでaxiosを使用
  // CookieからXSRF-TOKENを取得し、X-XSRF-TOKENヘッダへセットしてくれる
  await axios.get('/sanctum/csrf-cookie');
}
