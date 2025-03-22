<?php

namespace Tests\Feature\Auth\AuthenticatedSession;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

final class DestroyTest extends TestCase
{
    use RefreshDatabase;

    private const LOGOUT_ROUTE = 'logout';

    /**
     * 認証済みユーザーがログアウトできることをテスト
     */
    public function test_authenticated_user_can_logout(): void
    {
        // ユーザーを作成して認証
        /** @var \Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->create();

        $this
            ->actingAs($user)
            ->postJson(route(self::LOGOUT_ROUTE))
            ->assertStatus(Response::HTTP_NO_CONTENT);
    }

    /**
     * 未認証ユーザーがログアウトエンドポイントにアクセスできないことをテスト
     */
    public function test_unauthenticated_user_cannot_access_logout_endpoint(): void
    {
        $this
            ->postJson(route(self::LOGOUT_ROUTE))
            ->assertStatus(Response::HTTP_UNAUTHORIZED)
            ->assertExactJson([
                'message' => 'Unauthenticated',
                'error'   => [],
                'success' => false,
            ]);
    }
}
