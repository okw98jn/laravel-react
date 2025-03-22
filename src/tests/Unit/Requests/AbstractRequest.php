<?php

namespace Tests\Unit\Requests;

use Illuminate\Support\Facades\Validator;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

/**
 * リクエストのバリデーションテストを行う抽象クラス
 */
abstract class AbstractRequest extends TestCase
{
    /**
     * バリデーション失敗のテストデータを提供する
     *
     * 例:
     * [
     *     '空のメールアドレス' => [
     *         [], // リクエストパラメータ
     *         'email', // バリデーション失敗フィールド
     *         'メールアドレスは必ず指定してください。', // バリデーション失敗メッセージ
     *     ],
     * ]
     * @return array<string, array<int, array<string, mixed>|string>>
     */
    abstract public static function validationFailureDataProvider(): array;

    #[DataProvider('validationFailureDataProvider')]
    public function test_validation_should_fail(array $requestParams, string $expectedField, string $expectedMessage): void
    {
        $requestClass = $this->getRequestClass();
        $request      = new $requestClass();

        $rules = $request->rules();

        $validator = Validator::make(
            $requestParams,
            $rules,
            $request->messages(),
            $request->attributes()
        );

        $actualMessages = $validator->messages()->get($expectedField);

        $this->assertSame(
            $expectedMessage,
            $actualMessages[array_search($expectedMessage, $actualMessages, true)]
        );
    }

    /**
     * 有効なデータでバリデーションが通過することをテスト
     *
     * @return void
     */
    public function test_validation_should_pass_with_valid_data(): void
    {
        $requestClass = $this->getRequestClass();
        $request      = new $requestClass();

        $rules = $request->rules();

        $validator = Validator::make(
            $this->getValidData(),
            $rules,
            $request->messages(),
            $request->attributes()
        );

        $this->assertTrue($validator->passes());
    }

    /**
     * テスト対象のRequestクラスを返す
     *
     * @return string
     */
    abstract protected function getRequestClass(): string;

    /**
     * 有効なリクエストデータを返す
     *
     * @return array<string, mixed>
     */
    abstract protected function getValidData(): array;
}
