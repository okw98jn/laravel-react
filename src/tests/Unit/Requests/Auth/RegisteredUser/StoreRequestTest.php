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
                    'email'                 => 'test@example.com',
                    'password'              => 'password123',
                    'password_confirmation' => 'password123',
                ],
                'name',
                '名前は必ず指定してください。',
            ],
            '名前が長すぎる' => [
                [
                    'name'                  => str_repeat('a', 256),
                    'email'                 => 'test@example.com',
                    'password'              => 'password123',
                    'password_confirmation' => 'password123',
                ],
                'name',
                '名前は、255文字以下で指定してください。',
            ],
            '空のメールアドレス' => [
                [
                    'name'                  => 'テストユーザー',
                    'password'              => 'password123',
                    'password_confirmation' => 'password123',
                ],
                'email',
                'メールアドレスは必ず指定してください。',
            ],
            '無効なメールアドレス' => [
                [
                    'name'                  => 'テストユーザー',
                    'email'                 => 'invalid-email',
                    'password'              => 'password123',
                    'password_confirmation' => 'password123',
                ],
                'email',
                'メールアドレスには、有効なメールアドレスを指定してください。',
            ],
            '空のパスワード' => [
                [
                    'name'                  => 'テストユーザー',
                    'email'                 => 'test@example.com',
                    'password_confirmation' => 'password123',
                ],
                'password',
                'パスワードは必ず指定してください。',
            ],
            'パスワードが短すぎる' => [
                [
                    'name'                  => 'テストユーザー',
                    'email'                 => 'test@example.com',
                    'password'              => 'pass',
                    'password_confirmation' => 'pass',
                ],
                'password',
                'パスワードは、8文字以上で指定してください。',
            ],
            'パスワード確認が一致しない' => [
                [
                    'name'                  => 'テストユーザー',
                    'email'                 => 'test@example.com',
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
