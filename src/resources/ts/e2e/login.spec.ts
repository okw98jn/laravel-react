import { expect, test } from '@playwright/test';

test.describe('ログイン機能のテスト', () => {
  test.beforeEach(async ({ page }) => {
    // 各テスト前にログインページに移動
    await page.goto('login');
  });

  test('ログインページが正しく表示される', async ({ page }) => {
    // ヘッダーが表示されることを確認
    await expect(
      page.getByRole('heading', { level: 1, name: 'ログイン' }),
    ).toBeVisible();

    // フォーム要素が表示されることを確認
    await expect(page.getByLabel('メールアドレス')).toBeVisible();
    await expect(page.getByLabel('パスワード')).toBeVisible();
    await expect(page.getByRole('button', { name: 'ログイン' })).toBeVisible();

    // ソーシャルログインボタンが表示されることを確認
    await expect(page.getByRole('button', { name: 'Google' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'GitHub' })).toBeVisible();
  });

  test('入力フィールドが空の場合はバリデーションエラーが表示される', async ({
    page,
  }) => {
    // 空のフォームでログイン試行
    await page.getByRole('button', { name: 'ログイン' }).click();

    // バリデーションエラーメッセージが表示されることを確認
    await expect(
      page.getByText('メールアドレスの形式で入力してください。'),
    ).toBeVisible();
    await expect(
      page.getByText('パスワードは1文字以上で入力してください。'),
    ).toBeVisible();
  });

  test('不正な形式のメールアドレスでバリデーションエラーが表示される', async ({
    page,
  }) => {
    // 不正なメールアドレスを入力
    await page.getByLabel('メールアドレス').fill('invalid-email');
    await page.getByLabel('パスワード').fill('password123');
    await page.getByRole('button', { name: 'ログイン' }).click();

    // メールアドレスのバリデーションエラーが表示されることを確認
    await expect(
      page.getByText('メールアドレスの形式で入力してください。'),
    ).toBeVisible();
  });

  test('誤った認証情報ではログインできない', async ({ page }) => {
    // 存在しないユーザーでログイン試行
    await page.getByLabel('メールアドレス').fill('wrong@example.com');
    await page.getByLabel('パスワード').fill('wrong-password');
    await page.getByRole('button', { name: 'ログイン' }).click();

    // エラーメッセージが表示されることを確認
    await expect(page.getByText('ログイン失敗')).toBeVisible();
    await expect(
      page.getByText('メールアドレスかパスワードが間違っています。'),
    ).toBeVisible();
  });

  test('正しい認証情報でログインできる', async ({ page }) => {
    // E2ETestSeederで作成したテストユーザーでログイン
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
  });
});
