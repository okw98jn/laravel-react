<?php

namespace Tests\Unit\Requests\User;

use App\Enums\User\Gender;
use App\Enums\User\Status;
use App\Http\Requests\User\StoreRequest;
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
                    'email'    => 'test@example.com',
                    'gender'   => Gender::MALE->value,
                    'status'   => Status::ACTIVE->value,
                    'password' => 'password123',
                ],
                'name',
                '名前は必ず指定してください。',
            ],
            '名前が長すぎる' => [
                [
                    'name'     => str_repeat('a', 256),
                    'email'    => 'test@example.com',
                    'gender'   => Gender::MALE->value,
                    'status'   => Status::ACTIVE->value,
                    'password' => 'password123',
                ],
                'name',
                '名前は、255文字以下で指定してください。',
            ],
            '空のメールアドレス' => [
                [
                    'name'     => 'テストユーザー',
                    'gender'   => Gender::MALE->value,
                    'status'   => Status::ACTIVE->value,
                    'password' => 'password123',
                ],
                'email',
                'メールアドレスは必ず指定してください。',
            ],
            '無効なメールアドレス' => [
                [
                    'name'     => 'テストユーザー',
                    'email'    => 'invalid-email',
                    'gender'   => Gender::MALE->value,
                    'status'   => Status::ACTIVE->value,
                    'password' => 'password123',
                ],
                'email',
                'メールアドレスには、有効なメールアドレスを指定してください。',
            ],
            'メールアドレスが長すぎる' => [
                [
                    'name'     => 'テストユーザー',
                    'email'    => str_repeat('a', 246) . '@example.com',
                    'gender'   => Gender::MALE->value,
                    'status'   => Status::ACTIVE->value,
                    'password' => 'password123',
                ],
                'email',
                'メールアドレスは、255文字以下で指定してください。',
            ],
            '空の性別' => [
                [
                    'name'     => 'テストユーザー',
                    'email'    => 'test@example.com',
                    'status'   => Status::ACTIVE->value,
                    'password' => 'password123',
                ],
                'gender',
                '性別は必ず指定してください。',
            ],
            '無効な性別' => [
                [
                    'name'     => 'テストユーザー',
                    'email'    => 'test@example.com',
                    'gender'   => 999,
                    'status'   => Status::ACTIVE->value,
                    'password' => 'password123',
                ],
                'gender',
                'The selected 性別 is invalid.',
            ],
            '空のステータス' => [
                [
                    'name'     => 'テストユーザー',
                    'email'    => 'test@example.com',
                    'gender'   => Gender::MALE->value,
                    'password' => 'password123',
                ],
                'status',
                'ステータスは必ず指定してください。',
            ],
            '無効なステータス' => [
                [
                    'name'     => 'テストユーザー',
                    'email'    => 'test@example.com',
                    'gender'   => Gender::MALE->value,
                    'status'   => 999,
                    'password' => 'password123',
                ],
                'status',
                'The selected ステータス is invalid.',
            ],
            'メモが長すぎる' => [
                [
                    'name'     => 'テストユーザー',
                    'email'    => 'test@example.com',
                    'gender'   => Gender::MALE->value,
                    'status'   => Status::ACTIVE->value,
                    'memo'     => str_repeat('a', 1001),
                    'password' => 'password123',
                ],
                'memo',
                'メモは、1000文字以下で指定してください。',
            ],
        ];
    }

    /**
     * バリデーション対象のリクエストクラスを返す
     *
     * @return string
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
            'name'     => 'テストユーザー',
            'email'    => 'test@example.com',
            'gender'   => Gender::MALE->value,
            'status'   => Status::ACTIVE->value,
            'memo'     => 'テストメモ',
            'password' => 'password123',
        ];
    }
}
