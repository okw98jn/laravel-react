<?php

namespace Tests\Feature\User;

use App\Enums\User\Gender;
use App\Enums\User\Status;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

final class StoreTest extends TestCase
{
    use RefreshDatabase;

    private const STORE_ROUTE = 'users.store';

    /**
     * 認証済みユーザーが正常なデータでユーザーを作成できることをテスト
     */
    public function test_authenticated_user_can_create_user_with_valid_data(): void
    {
        // 認証用ユーザーを作成
        /** @var \Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->create();
        $this->actingAs($user);

        $userData = [
            'name'     => 'テストユーザー',
            'email'    => 'new-user@example.com',
            'gender'   => Gender::MALE->value,
            'status'   => Status::ACTIVE->value,
            'memo'     => 'テストメモ',
            'password' => 'password123',
        ];

        $response = $this->postJson(route(self::STORE_ROUTE), $userData);

        $response
            ->assertStatus(Response::HTTP_CREATED)
            ->assertJson([
                'data' => [
                    'user' => [
                        'name'  => 'テストユーザー',
                        'email' => 'new-user@example.com',
                    ],
                ],
                'success' => true,
            ]);
    }

    /**
     * 認証済みユーザーがメモなしでユーザーを作成できることをテスト
     */
    public function test_authenticated_user_can_create_user_without_memo(): void
    {
        // 認証用ユーザーを作成
        /** @var \Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->create();
        $this->actingAs($user);

        $userData = [
            'name'     => 'メモなしユーザー',
            'email'    => 'no-memo@example.com',
            'gender'   => Gender::FEMALE->value,
            'status'   => Status::TEMPORARY->value,
            'memo'     => null,
            'password' => 'password123',
        ];

        $response = $this->postJson(route(self::STORE_ROUTE), $userData);

        $response
            ->assertStatus(Response::HTTP_CREATED)
            ->assertJson([
                'data' => [
                    'user' => [
                        'name'  => 'メモなしユーザー',
                        'email' => 'no-memo@example.com',
                    ],
                ],
                'success' => true,
            ]);
    }

    /**
     * 既存のメールアドレスでユーザーを作成できないことをテスト
     */
    public function test_cannot_create_user_with_duplicate_email(): void
    {
        // 認証用ユーザーを作成
        /** @var \Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->create();
        $this->actingAs($user);

        // 既存のユーザーを作成
        User::factory()->create([
            'email' => 'existing@example.com',
        ]);

        $userData = [
            'name'     => '重複メールユーザー',
            'email'    => 'existing@example.com',  // 既存のメールアドレス
            'gender'   => Gender::MALE->value,
            'status'   => Status::ACTIVE->value,
            'memo'     => 'テストメモ',
            'password' => 'password123',
        ];

        $response = $this->postJson(route(self::STORE_ROUTE), $userData);

        $response
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJsonPath('success', false)
            ->assertJsonPath('message', 'Validation Error')
            ->assertJsonStructure([
                'error' => [
                    'email',
                ],
                'message',
                'success',
            ]);
    }

    /**
     * 未認証ユーザーがユーザー作成エンドポイントにアクセスできないことをテスト
     */
    public function test_unauthenticated_user_cannot_create_user(): void
    {
        $userData = [
            'name'     => 'テストユーザー',
            'email'    => 'new-user@example.com',
            'gender'   => Gender::MALE->value,
            'status'   => Status::ACTIVE->value,
            'memo'     => 'テストメモ',
            'password' => 'password123',
        ];

        $response = $this->postJson(route(self::STORE_ROUTE), $userData);

        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
    }
}
