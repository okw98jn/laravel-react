<?php

namespace Tests\Feature\Admin\Auth\AuthenticatedSession;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

final class StoreTest extends TestCase
{
    use RefreshDatabase;

    private const LOGIN_ROUTE = 'admin.login';

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
                    'created_at',
                    'updated_at',
                ],
            ])
            ->assertJson([
                'data' => [
                    'id'    => $user->id,
                    'email' => 'login@example.com',
                ],
            ]);
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
                'message' => 'Unauthenticated.',
            ]);
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
                'message' => 'Unauthenticated.',
            ]);
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
            ->assertJsonValidationErrors(['email']);
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
            ->assertJsonValidationErrors(['password']);
    }
}
