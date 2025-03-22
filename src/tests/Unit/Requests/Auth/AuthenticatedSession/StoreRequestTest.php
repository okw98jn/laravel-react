<?php

namespace Tests\Unit\Requests\Auth\AuthenticatedSession;

use App\Http\Requests\Auth\AuthenticatedSession\StoreRequest;
use Tests\Unit\Requests\AbstractRequest;

final class StoreRequestTest extends AbstractRequest
{
    /**
     * バリデーション失敗のテストデータを提供する
     *
     * @return array<string, array<int, array<string, mixed>|string>>
     */
    public static function validationFailureDataProvider(): array
    {
        return [
            '空のメールアドレス' => [
                [],
                'email',
                'メールアドレスは必ず指定してください。',
            ],
            '無効なメールアドレス' => [
                [
                    'email' => 'invalid-email',
                ],
                'email',
                'メールアドレスには、有効なメールアドレスを指定してください。',
            ],
            'メールアドレスが文字列でない' => [
                [
                    'email' => 123,
                ],
                'email',
                'メールアドレスは文字列を指定してください。',
            ],
            '空のパスワード' => [
                [],
                'password',
                'パスワードは必ず指定してください。',
            ],
            'パスワードが文字列でない' => [
                [
                    'password' => 123,
                ],
                'password',
                'パスワードは文字列を指定してください。',
            ],
        ];
    }

    /**
     * テスト対象のRequestクラスを返す
     */
    protected function getRequestClass(): string
    {
        return StoreRequest::class;
    }

    /**
     * 有効なリクエストデータを返す
     *
     * @return array<string, mixed>
     */
    protected function getValidData(): array
    {
        return [
            'email'    => 'test@example.com',
            'password' => 'password',
        ];
    }
}
