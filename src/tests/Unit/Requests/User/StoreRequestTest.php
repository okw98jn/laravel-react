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
                [],
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
            'メールアドレスが長すぎる' => [
                [
                    'email' => str_repeat('a', 246) . '@example.com',
                ],
                'email',
                'メールアドレスは、255文字以下で指定してください。',
            ],
            '空の性別' => [
                [],
                'gender',
                '性別は必ず指定してください。',
            ],
            '無効な性別' => [
                [
                    'gender' => 999,
                ],
                'gender',
                'The selected 性別 is invalid.',
            ],
            '空のステータス' => [
                [],
                'status',
                'ステータスは必ず指定してください。',
            ],
            '無効なステータス' => [
                [
                    'status' => 999,
                ],
                'status',
                'The selected ステータス is invalid.',
            ],
            'メモが長すぎる' => [
                [
                    'memo' => str_repeat('a', 1001),
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
