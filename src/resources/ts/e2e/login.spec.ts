import { expect, test } from '@playwright/test';
import { loginAsTestUser } from './utils/auth';

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
    await loginAsTestUser(page);
  });

  test('ログアウトできる', async ({ page }) => {
    await loginAsTestUser(page);

    await page
      .getByRole('button', { name: 'SN テストユーザー e2e@example.com' })
      .click();

    await page.getByRole('menuitem', { name: 'ログアウト' }).click();

    // ログインページにリダイレクトされることを確認
    await expect(page).toHaveURL('/login');

    // トースト通知が表示されることを確認
    await expect(page.getByText('ログアウトしました。')).toBeVisible();
  });

  test('未ログイン状態でダッシュボードを開くとログインページにリダイレクトされる', async ({
    page,
  }) => {
    await page.goto('/');

    // ログインページにリダイレクトされることを確認
    await expect(page).toHaveURL('/login');

    await expect(
      page.getByRole('heading', { level: 1, name: 'ログイン' }),
    ).toBeVisible();
  });

  test('ログイン状態でログイン画面を開くとダッシュボードにリダイレクトされる', async ({
    page,
  }) => {
    await loginAsTestUser(page);

    await page.goto('login');

    // ダッシュボードにリダイレクトされることを確認
    await expect(page).toHaveURL('/');
  });
});
