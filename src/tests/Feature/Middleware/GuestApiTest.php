<?php

namespace Tests\Feature\Middleware;

use App\Http\Middleware\GuestApi;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class GuestApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * テスト用ルートの設定
     */
    protected function setUp(): void
    {
        parent::setUp();

        // テスト用のルートを定義
        Route::get('api/guest-only', function () {
            return response()->json(['status' => 'success']);
        })->middleware(GuestApi::class);
    }

    /**
     * 未認証ユーザーがアクセスできることをテスト
     */
    public function test_unauthenticated_user_can_access(): void
    {
        // 未認証状態を確認
        $this->assertFalse(Auth::check());

        // APIにアクセス
        $response = $this->getJson('api/guest-only');

        // 正常なレスポンスが返ることを確認
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJson(['status' => 'success']);
    }

    /**
     * 認証済みユーザーがアクセスするとエラーになることをテスト
     */
    public function test_authenticated_user_cannot_access(): void
    {
        // テスト用のユーザーを作成して認証
        /** @var \Illuminate\Contracts\Auth\Authenticatable $user */
        $user = User::factory()->create();
        $this->actingAs($user);

        // 認証状態を確認
        $this->assertTrue(Auth::check());

        // APIにアクセス
        $response = $this->getJson('api/guest-only');

        // アクセス拒否エラーが返ることを確認
        $response->assertStatus(Response::HTTP_FORBIDDEN);
    }
}
