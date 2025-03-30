import { type Page, expect } from '@playwright/test';

/**
 * テストユーザーとしてログインする
 */
export async function loginAsTestUser(page: Page): Promise<void> {
  // ログインページに移動
  await page.goto('login');

  // ログインフォームに入力
  await page.getByLabel('メールアドレス').fill('e2e@example.com');
  await page.getByLabel('パスワード').fill('password');
  await page.getByRole('button', { name: 'ログイン' }).click();

  // ログイン成功のトースト通知が表示されることを確認
  await expect(page.getByText('ログインしました。')).toBeVisible();

  // ダッシュボードにリダイレクトされることを確認
  await expect(page).toHaveURL('/');

  // ログイン後のユーザー情報が表示されることを確認
  await expect(page.getByText('テストユーザー')).toBeVisible();
  await expect(page.getByText('e2e@example.com')).toBeVisible();
}
