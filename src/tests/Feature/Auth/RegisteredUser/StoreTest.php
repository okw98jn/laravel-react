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
            ->assertJson([
                'data' => [
                    'user' => [
                        'name'  => 'テストユーザー',
                        'email' => 'test@example.com',
                    ],
                ],
                'success' => true,
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
