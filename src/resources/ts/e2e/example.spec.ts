import { expect, test } from '@playwright/test';

test('h1にログインテキストが含まれているか確認', async ({ page }) => {
  await page.goto('http://laravel-web/login');

  // h1要素の中に「ログイン」テキストがあるか確認
  await expect(
    page.getByRole('heading', { level: 1, name: 'ログイン' }),
  ).toBeVisible();

  // await page.getByPlaceholder('メールアドレス').fill('test@example.com');
  // await page.getByPlaceholder('').fill('password');
  await page.getByRole('button', { name: 'ログイン' }).click();

  await expect(
    page.getByText('パスワードは1文字以上で入力してください。'),
  ).toBeVisible();
});
