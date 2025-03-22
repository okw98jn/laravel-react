<?php

namespace Tests\Unit\Requests\Auth\AuthenticatedSession;

use App\Http\Requests\Auth\AuthenticatedSession\StoreRequest;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

final class StoreRequestTest extends TestCase
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
                ['email' => 'invalid-email'],
                'email',
                'メールアドレスには、有効なメールアドレスを指定してください。',
            ],
            'メールアドレスが文字列でない' => [
                ['email' => 123],
                'email',
                'メールアドレスは文字列を指定してください。',
            ],
            '空のパスワード' => [
                ['email' => 'test@example.com'],
                'password',
                'パスワードは必ず指定してください。',
            ],
            'パスワードが文字列でない' => [
                ['email' => 'test@example.com', 'password' => 123],
                'password',
                'パスワードは文字列を指定してくださaい。',
            ],
        ];
    }

    #[DataProvider('validationFailureDataProvider')]
    public function test_validation_should_fail(array $requestParams, string $expectedField, string $expectedMessage): void
    {
        $request   = new StoreRequest();
        $rules     = $request->rules();
        $validator = Validator::make($requestParams, $rules, [], $request->attributes());

        $actualMessages = $validator->messages()->get($expectedField);

        $this->assertSame(
            $expectedMessage,
            $actualMessages[array_search($expectedMessage, $actualMessages, true)]
        );
    }

    /**
     * 有効なデータでバリデーションが通過することをテスト
     */
    public function test_validation_should_pass_with_valid_data(): void
    {
        $requestParams = [
            'email'    => 'test@example.com',
            'password' => 'password',
        ];

        $request   = new StoreRequest();
        $rules     = $request->rules();
        $validator = Validator::make($requestParams, $rules, [], $request->attributes());

        $this->assertTrue($validator->passes());
    }
}
