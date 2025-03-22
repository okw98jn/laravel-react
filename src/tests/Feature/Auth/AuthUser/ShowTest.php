<?php

namespace Tests\Feature\Auth\AuthUser;

use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class ShowTest extends TestCase
{
    use RefreshDatabase;

    /**
     * 認証済みユーザーがAPI経由で自分の情報を取得できることをテスト
     */
    public function test_authenticated_user_can_retrieve_own_information(): void
    {
        // テストユーザーを作成して認証
        $user = User::factory()->create();
        /** @var User&Authenticatable $user */
        $this->actingAs($user);

        // APIリクエストを送信
        $response = $this->getJson('/api/auth-user');

        // レスポンスの検証
        $response->assertStatus(Response::HTTP_OK);
        $response->assertExactJson([
            'data' => [
                'user' => [
                    'id'     => $user->id,
                    'name'   => $user->name,
                    'email'  => $user->email,
                    'gender' => $user->gender,
                    'status' => $user->status,
                    'memo'   => $user->memo,
                ],
            ],
            'success' => true,
        ]);
    }

    /**
     * 未認証ユーザーがAPI経由でユーザー情報を取得しようとするとエラーになることをテスト
     */
    public function test_unauthenticated_user_cannot_retrieve_user_information(): void
    {
        // 未認証状態でAPIリクエストを送信
        $response = $this->getJson('/api/auth-user');

        // 未認証エラーが返されることを確認
        $response->assertStatus(Response::HTTP_UNAUTHORIZED);

        $response->assertExactJson([
            'error'   => [],
            'message' => 'Unauthenticated',
            'success' => false,
        ]);
    }
}
