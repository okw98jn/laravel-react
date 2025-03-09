<?php

namespace Tests\Feature\Admin\Auth\AuthenticatedSession;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

final class DestroyTest extends TestCase
{
    use RefreshDatabase;

    private const LOGOUT_ROUTE = 'admin.logout';

    /**
     * 認証済みユーザーがログアウトできることをテスト
     */
    public function test_authenticated_user_can_logout(): void
    {
        // ユーザーを作成して認証
        /** @var \Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->postJson(route(self::LOGOUT_ROUTE));

        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJson([
                'message' => 'ログアウトしました',
            ]);

        // ユーザーがログアウトしていることを確認
        $this->assertGuest();
    }

    /**
     * 未認証ユーザーがログアウトエンドポイントにアクセスできないことをテスト
     */
    public function test_unauthenticated_user_cannot_access_logout_endpoint(): void
    {
        $response = $this->postJson(route(self::LOGOUT_ROUTE));

        $response
            ->assertStatus(Response::HTTP_UNAUTHORIZED)
            ->assertJson([
                'message' => 'Unauthenticated',
                'body'    => [],
            ]);
    }
}
