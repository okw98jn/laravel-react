<?php

namespace Tests\Unit\UseCases\Auth\AuthUser;

use App\Models\User;
use App\UseCases\Auth\AuthUser\ShowUseCase;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class ShowUseCaseTest extends TestCase
{
    use RefreshDatabase;

    private ShowUseCase $useCase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->useCase = new ShowUseCase();
    }

    /**
     * ログインユーザーが取得できることをテスト
     */
    public function handle_returns_authenticated_user(): void
    {
        // テストユーザー作成
        /** @var User $expectedUser */
        $expectedUser = User::factory()->create();

        // ユーザーをログイン状態にする
        Auth::login($expectedUser);

        // ユーザーが認証済みであることを確認
        $this->assertTrue(Auth::check());

        $actualUser = $this->useCase->handle();

        // 取得したユーザーが期待通りであることを確認
        $this->assertEquals($expectedUser->id, $actualUser->id);
        $this->assertEquals($expectedUser->name, $actualUser->name);
        $this->assertEquals($expectedUser->email, $actualUser->email);
    }

    /**
     * 未ログイン状態で例外が発生することをテスト
     */
    public function handle_throws_exception_when_unauthenticated(): void
    {
        // 未ログイン状態を確認
        Auth::logout();
        $this->assertFalse(Auth::check());

        // 例外が発生することを期待
        $this->expectException(AuthenticationException::class);

        $this->useCase->handle();
    }
}
