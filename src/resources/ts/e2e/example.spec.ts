import { expect, test } from '@playwright/test';

test('h1にログインテキストが含まれているか確認', async ({ page }) => {
  await page.goto('login');

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

  // デバッグ: 画面に表示されているすべてのテキストを取得して表示
  const bodyText = await page.textContent('body');
  console.log('画面のテキスト内容:', bodyText);

  // デバッグ: HTMLの構造を確認
  const htmlContent = await page.content();
  console.log('HTML構造:', htmlContent);

  // スクリーンショットを撮影（CIの成果物として保存される）
  await page.screenshot({ path: 'debug-login-screen.png', fullPage: true });
});
