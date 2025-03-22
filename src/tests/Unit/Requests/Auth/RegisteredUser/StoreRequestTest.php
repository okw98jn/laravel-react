<?php

namespace Tests\Unit\Requests\Auth\RegisteredUser;

use App\Http\Requests\Auth\RegisteredUser\StoreRequest;
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
            '空の名前' => [
                [
                    'email' => 'test@example.com',
                ],
                'name',
                '名前は必ず指定してください。',
            ],
            '名前が長すぎる' => [
                [
                    'name' => str_repeat('a', 256),
                ],
                'name',
                '名前は、255文字以下で指定してください。',
            ],
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
            '空のパスワード' => [
                [],
                'password',
                'パスワードは必ず指定してください。',
            ],
            'パスワードが短すぎる' => [
                [
                    'password' => 'pass',
                ],
                'password',
                'パスワードは、8文字以上で指定してください。',
            ],
            'パスワード確認が一致しない' => [
                [
                    'password'              => 'password123',
                    'password_confirmation' => 'different',
                ],
                'password',
                'パスワードと、確認フィールドが、一致していません。',
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
            'name'                  => 'テストユーザー',
            'email'                 => 'test@example.com',
            'password'              => 'password123',
            'password_confirmation' => 'password123',
        ];
    }
}
