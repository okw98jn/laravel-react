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
            ->assertStatus(Response::HTTP_CREATED)
            ->assertExactJson([
                'data' => [
                    'user' => [
                        'id'    => $user->id,
                        'name'  => $user->name,
                        'email' => $user->email,
                    ],
                ],
                'success' => true,
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
            ->assertExactJson([
                'message' => 'Unauthenticated',
                'error'   => [],
                'success' => false,
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
        $response->assertStatus(Response::HTTP_CREATED);
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
