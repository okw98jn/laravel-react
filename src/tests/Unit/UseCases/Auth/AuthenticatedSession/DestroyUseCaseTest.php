<?php

namespace Tests\Unit\UseCases\Auth\AuthenticatedSession;

use App\Models\User;
use App\UseCases\Auth\AuthenticatedSession\DestroyUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

final class DestroyUseCaseTest extends TestCase
{
    use RefreshDatabase;

    private DestroyUseCase $useCase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->useCase = new DestroyUseCase();
    }

    /**
     * ログイン済みユーザーが正常にログアウトできることをテスト
     */
    public function test_can_logout_authenticated_user(): void
    {
        // ユーザーを作成
        $user = User::factory()->create();

        // ユーザーをログイン状態にする
        Auth::login($user);

        // ログイン状態を確認
        $this->assertTrue(Auth::check());

        // ログアウト処理を実行
        $this->useCase->handle();

        // ログアウト状態を確認
        $this->assertFalse(Auth::check());
    }

    /**
     * 未ログインでもエラーが発生しないことをテスト
     */
    public function test_does_not_throw_error_for_unauthenticated_user(): void
    {
        // 未ログイン状態を確認
        $this->assertFalse(Auth::check());

        // ログアウト処理を実行
        $this->useCase->handle();

        // エラーが発生せずに処理が完了すること
        $this->assertFalse(Auth::check());
    }

    /**
     * ログアウト後にセッションが維持されることをテスト
     */
    public function test_session_persists_after_logout(): void
    {
        // ユーザーを作成してログイン
        $user = User::factory()->create();
        Auth::login($user);

        // セッションにテストデータを設定
        session(['test_key' => 'test_value']);

        // ログアウト処理を実行
        $this->useCase->handle();

        // ログアウト状態を確認
        $this->assertFalse(Auth::check());

        // セッションデータが維持されていることを確認
        $this->assertEquals('test_value', session('test_key'));
    }

    /**
     * 複数回ログアウトしても問題ないことをテスト
     */
    public function test_multiple_logout_calls_do_not_cause_errors(): void
    {
        // ユーザーを作成してログイン
        $user = User::factory()->create();
        Auth::login($user);

        // 1回目のログアウト
        $this->useCase->handle();
        $this->assertFalse(Auth::check());

        // 2回目のログアウト（既にログアウト済み）
        $this->useCase->handle();
        $this->assertFalse(Auth::check());

        // 3回目のログアウト
        $this->useCase->handle();
        $this->assertFalse(Auth::check());
    }
}
