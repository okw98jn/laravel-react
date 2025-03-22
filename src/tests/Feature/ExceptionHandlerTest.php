<?php

namespace Tests\Feature;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response as HttpResponse;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Tests\TestCase;

class ExceptionHandlerTest extends TestCase
{
    /**
     * テスト用ルートの設定
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        // 認証エラー（UnauthorizedHttpException）
        Route::get('api/test-unauthorized', function () {
            throw new UnauthorizedHttpException('Basic', 'Unauthorized');
        });

        // 認証エラー（AuthenticationException）
        Route::get('api/test-authentication', function () {
            throw new AuthenticationException('Unauthenticated');
        });

        // アクセス拒否エラー
        Route::get('api/test-forbidden', function () {
            throw new AccessDeniedHttpException('Forbidden');
        });

        // 存在しないリソースエラー
        Route::get('api/test-not-found', function () {
            throw new NotFoundHttpException('Not Found');
        });

        // バリデーションエラー
        Route::get('api/test-validation', function () {
            throw ValidationException::withMessages([
                'name'  => ['名前は必須です'],
                'email' => ['メールアドレスの形式が正しくありません'],
            ]);
        });

        // 予期せぬエラー
        Route::get('api/test-internal-error', function () {
            throw new Exception('エラーが発生しました');
        });
    }

    /**
     * 認証エラー（401）のテスト - UnauthorizedHttpException
     *
     * @return void
     */
    public function test_unauthorized_http_exception(): void
    {
        // テストリクエストを実行
        $response = $this->getJson('api/test-unauthorized');

        // レスポンスを検証
        $response->assertStatus(HttpResponse::HTTP_UNAUTHORIZED)
            ->assertJson([
                'success' => false,
                'message' => __('error.401'),
                'error'   => [],
            ]);
    }

    /**
     * 認証エラー（401）のテスト - AuthenticationException
     *
     * @return void
     */
    public function test_authentication_exception(): void
    {
        // テストリクエストを実行
        $response = $this->getJson('api/test-authentication');

        // レスポンスを検証
        $response->assertStatus(HttpResponse::HTTP_UNAUTHORIZED)
            ->assertJson([
                'success' => false,
                'message' => __('error.401'),
                'error'   => [],
            ]);
    }

    /**
     * アクセス拒否エラー（403）のテスト
     *
     * @return void
     */
    public function test_forbidden_exception(): void
    {
        // テストリクエストを実行
        $response = $this->getJson('api/test-forbidden');

        // レスポンスを検証
        $response->assertStatus(HttpResponse::HTTP_FORBIDDEN)
            ->assertJson([
                'success' => false,
                'message' => __('error.403'),
                'error'   => [],
            ]);
    }

    /**
     * 存在しないリソースエラー（404）のテスト
     *
     * @return void
     */
    public function test_not_found_exception(): void
    {
        // テストリクエストを実行
        $response = $this->getJson('api/test-not-found');

        // レスポンスを検証
        $response->assertStatus(HttpResponse::HTTP_NOT_FOUND)
            ->assertJson([
                'success' => false,
                'message' => __('error.404'),
                'error'   => [],
            ]);
    }

    /**
     * バリデーションエラー（422）のテスト
     *
     * @return void
     */
    public function test_validation_exception(): void
    {
        // テストリクエストを実行
        $response = $this->getJson('api/test-validation');

        // レスポンスを検証
        $response->assertStatus(HttpResponse::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJson([
                'success' => false,
                'message' => __('error.422'),
                'error'   => [
                    'name'  => '名前は必須です',
                    'email' => 'メールアドレスの形式が正しくありません',
                ],
            ]);
    }

    /**
     * 予期せぬエラー（500）のテスト
     *
     * @return void
     */
    public function test_internal_server_error(): void
    {
        // テストリクエストを実行
        $response = $this->getJson('api/test-internal-error');

        // レスポンスを検証
        $response->assertStatus(HttpResponse::HTTP_INTERNAL_SERVER_ERROR)
            ->assertJson([
                'success' => false,
                'message' => __('error.500'),
            ]);

        // デバッグモードがONの場合はエラーメッセージが含まれることを検証
        if (config('app.debug')) {
            $response->assertJsonPath('error.0', 'エラーが発生しました');
        }
    }
}
