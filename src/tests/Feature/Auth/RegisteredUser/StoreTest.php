<?php

namespace Tests\Feature\Auth\RegisteredUser;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

final class StoreTest extends TestCase
{
    use RefreshDatabase;

    private const REGISTER_ROUTE = 'register';

    /**
     * 有効なデータでユーザー登録できることをテスト
     */
    public function test_can_register_with_valid_data(): void
    {
        $userData = [
            'name'                  => 'テストユーザー',
            'email'                 => 'test@example.com',
            'password'              => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->postJson(route(self::REGISTER_ROUTE), $userData);

        $response
            ->assertStatus(Response::HTTP_CREATED)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'email',
                    'email_verified_at',
                    'created_at',
                    'updated_at',
                ],
            ])
            ->assertJson([
                'data' => [
                    'name'  => 'テストユーザー',
                    'email' => 'test@example.com',
                ],
            ]);
    }

    /**
     * 不正な形式のメールアドレスで登録できないことをテスト
     */
    public function test_cannot_register_with_invalid_email_format(): void
    {
        $invalidEmailData = [
            'name'                  => 'テストユーザー',
            'email'                 => 'invalid-email',
            'password'              => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->postJson(route(self::REGISTER_ROUTE), $invalidEmailData);

        $response
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJson([
                'message' => 'Validation Error',
                'body'    => [
                    'email' => 'メールアドレスには、有効なメールアドレスを指定してください。',
                ],
            ]);
    }

    /**
     * パスワード確認が一致しない場合に登録できないことをテスト
     */
    public function test_cannot_register_with_mismatched_passwords(): void
    {
        $invalidPasswordData = [
            'name'                  => 'テストユーザー',
            'email'                 => 'test@example.com',
            'password'              => 'password123',
            'password_confirmation' => 'different-password',
        ];

        $response = $this->postJson(route(self::REGISTER_ROUTE), $invalidPasswordData);

        $response
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJson([
                'message' => 'Validation Error',
                'body'    => [
                    'password' => 'パスワードと、確認フィールドが、一致していません。',
                ],
            ]);
    }

    /**
     * 必須項目が不足している場合に登録できないことをテスト
     */
    public function test_cannot_register_with_missing_required_fields(): void
    {
        $missingFieldsData = [
            'name' => 'テストユーザー',
        ];

        $response = $this->postJson(route(self::REGISTER_ROUTE), $missingFieldsData);

        $response
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJson([
                'message' => 'Validation Error',
                'body'    => [
                    'email'    => 'メールアドレスは必ず指定してください。',
                    'password' => 'パスワードは必ず指定してください。',
                ],
            ]);
    }

    /**
     * 既存のメールアドレスで登録できないことをテスト
     */
    public function test_cannot_register_with_duplicate_email(): void
    {
        // 既存のユーザーを作成
        User::factory()->create([
            'email' => 'existing@example.com',
        ]);

        $duplicateEmailData = [
            'name'                  => '新規ユーザー',
            'email'                 => 'existing@example.com',
            'password'              => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->postJson(route(self::REGISTER_ROUTE), $duplicateEmailData);

        $response
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJson([
                'message' => 'Validation Error',
                'body'    => [
                    'email' => 'メールアドレスの値は既に存在しています。',
                ],
            ]);
    }

    /**
     * ログイン済みユーザーが登録エンドポイントにアクセスできないことをテスト
     */
    public function test_authenticated_user_cannot_access_register_endpoint(): void
    {
        // ログイン
        /** @var \Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->create();
        $this->actingAs($user);

        // 認証済みであることを確認
        $this->assertAuthenticated();

        // 登録エンドポイントにアクセス
        $response = $this->postJson(route(self::REGISTER_ROUTE), []);

        // リダイレクトされることを確認（ゲストミドルウェアの動作）
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}
