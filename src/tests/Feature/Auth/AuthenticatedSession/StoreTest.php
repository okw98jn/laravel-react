<?php

namespace Tests\Feature\Auth\AuthenticatedSession;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

final class StoreTest extends TestCase
{
    use RefreshDatabase;

    private const LOGIN_ROUTE = 'login';

    /**
     * 有効な認証情報でログインできることをテスト
     */
    public function test_can_login_with_valid_credentials(): void
    {
        // ユーザーを作成
        $user = User::factory()->create([
            'email'    => 'login@example.com',
            'password' => bcrypt('password123'),
        ]);

        $loginData = [
            'email'    => 'login@example.com',
            'password' => 'password123',
        ];

        $response = $this->postJson(route(self::LOGIN_ROUTE), $loginData);

        $response
            ->assertStatus(Response::HTTP_OK)
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
                    'id'    => $user->id,
                    'email' => 'login@example.com',
                    'name'  => $user->name,
                ],
            ]);

        // セッションにユーザーIDが保存されていることを確認
        $this->assertAuthenticated();
    }

    /**
     * 誤ったパスワードでログインできないことをテスト
     */
    public function test_cannot_login_with_invalid_password(): void
    {
        // ユーザーを作成
        User::factory()->create([
            'email'    => 'login@example.com',
            'password' => bcrypt('password123'),
        ]);

        $invalidPasswordData = [
            'email'    => 'login@example.com',
            'password' => 'wrong-password',
        ];

        $response = $this->postJson(route(self::LOGIN_ROUTE), $invalidPasswordData);

        $response
            ->assertStatus(Response::HTTP_UNAUTHORIZED)
            ->assertJson([
                'message' => 'Unauthenticated',
                'body'    => [],
            ]);

        // 認証されていないことを確認
        $this->assertGuest();
    }

    /**
     * 存在しないメールアドレスでログインできないことをテスト
     */
    public function test_cannot_login_with_nonexistent_email(): void
    {
        $nonExistentEmailData = [
            'email'    => 'nonexistent@example.com',
            'password' => 'password123',
        ];

        $response = $this->postJson(route(self::LOGIN_ROUTE), $nonExistentEmailData);

        $response
            ->assertStatus(Response::HTTP_UNAUTHORIZED)
            ->assertJson([
                'message' => 'Unauthenticated',
                'body'    => [],
            ]);

        // 認証されていないことを確認
        $this->assertGuest();
    }

    /**
     * メールアドレスが欠けている場合にログインできないことをテスト
     */
    public function test_cannot_login_with_missing_email(): void
    {
        $missingEmailData = [
            'password' => 'password123',
        ];

        $response = $this->postJson(route(self::LOGIN_ROUTE), $missingEmailData);

        $response
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJson([
                'message' => 'Validation Error',
                'body'    => [
                    'email' => 'メールアドレスは必ず指定してください。',
                ],
            ]);

        // 認証されていないことを確認
        $this->assertGuest();
    }

    /**
     * パスワードが欠けている場合にログインできないことをテスト
     */
    public function test_cannot_login_with_missing_password(): void
    {
        $missingPasswordData = [
            'email' => 'test@example.com',
        ];

        $response = $this->postJson(route(self::LOGIN_ROUTE), $missingPasswordData);

        $response
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJson([
                'message' => 'Validation Error',
                'body'    => [
                    'password' => 'パスワードは必ず指定してください。',
                ],
            ]);

        // 認証されていないことを確認
        $this->assertGuest();
    }

    /**
     * 無効なメールアドレス形式でログインできないことをテスト
     */
    public function test_cannot_login_with_invalid_email_format(): void
    {
        $invalidEmailData = [
            'email'    => 'invalid-email',
            'password' => 'password123',
        ];

        $response = $this->postJson(route(self::LOGIN_ROUTE), $invalidEmailData);

        $response
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJson([
                'message' => 'Validation Error',
                'body'    => [
                    'email' => 'メールアドレスには、有効なメールアドレスを指定してください。',
                ],
            ]);

        // 認証されていないことを確認
        $this->assertGuest();
    }

    /**
     * ログイン後にセッションが再生成されることをテスト
     */
    public function test_session_is_regenerated_after_login(): void
    {
        // ユーザーを作成
        User::factory()->create([
            'email'    => 'login@example.com',
            'password' => bcrypt('password123'),
        ]);

        $loginData = [
            'email'    => 'login@example.com',
            'password' => 'password123',
        ];

        // セッションIDを取得
        $sessionId = session()->getId();

        // ログインリクエスト
        $this->postJson(route(self::LOGIN_ROUTE), $loginData);

        // セッションIDが変更されていることを確認
        $this->assertNotEquals($sessionId, session()->getId());
    }

    /**
     * 連続した失敗ログイン試行のテスト
     */
    public function test_consecutive_failed_login_attempts(): void
    {
        // ユーザーを作成
        User::factory()->create([
            'email'    => 'login@example.com',
            'password' => bcrypt('password123'),
        ]);

        $invalidPasswordData = [
            'email'    => 'login@example.com',
            'password' => 'wrong-password',
        ];

        // 複数回の失敗ログイン試行
        for ($i = 0; $i < 3; $i++) {
            $response = $this->postJson(route(self::LOGIN_ROUTE), $invalidPasswordData);
            $response->assertStatus(Response::HTTP_UNAUTHORIZED);
        }

        // 正しい認証情報でログイン
        $validPasswordData = [
            'email'    => 'login@example.com',
            'password' => 'password123',
        ];

        $response = $this->postJson(route(self::LOGIN_ROUTE), $validPasswordData);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertAuthenticated();
    }

    /**
     * ログイン済みユーザーがログインエンドポイントにアクセスできないことをテスト
     */
    public function test_authenticated_user_cannot_access_login_endpoint(): void
    {
        // ユーザーを作成して認証
        /** @var \Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->create();
        $this->actingAs($user);

        // 認証済みであることを確認
        $this->assertAuthenticated();

        // ログインエンドポイントにアクセス
        $response = $this->postJson(route(self::LOGIN_ROUTE), []);

        // リダイレクトされることを確認（ゲストミドルウェアの動作）
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}
