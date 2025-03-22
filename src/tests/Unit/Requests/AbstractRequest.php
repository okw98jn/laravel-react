<?php

namespace Tests\Unit\Requests;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Validator as ValidatorInstance;
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

    /**
     * バリデーション失敗のテスト
     *
     * @param  array<string, mixed> $data            パラメータ
     * @param  string               $expectedField   期待するバリデーション失敗フィールド
     * @param  string               $expectedMessage 期待するバリデーション失敗メッセージ
     * @return void
     */
    #[DataProvider('validationFailureDataProvider')]
    public function test_validation_should_fail(array $data, string $expectedField, string $expectedMessage): void
    {
        // バリデーションを実行
        $validator = $this->createValidator($data);

        // バリデーション失敗メッセージを取得
        $actualMessages = $validator->messages()->get($expectedField);

        // バリデーション失敗メッセージが期待通りか検証
        $this->assertValidationMessageEquals($actualMessages, $expectedMessage);
    }

    /**
     * 有効なデータでバリデーションが通過することをテスト
     *
     * @return void
     */
    public function test_validation_should_pass_with_valid_data(): void
    {
        // バリデーションを実行
        $validator = $this->createValidator($this->getValidData());

        // バリデーションが通過することを検証
        $this->assertTrue($validator->passes());
    }

    /**
     * バリデーターを作成する
     *
     * @param  array<string, mixed> $data バリデーション対象データ
     * @return ValidatorInstance
     */
    protected function createValidator(array $data): ValidatorInstance
    {
        // リクエストクラスを作成
        $requestClass = $this->getRequestClass();
        $request      = new $requestClass();

        // ルールを取得
        $rules = $request->rules();

        // バリデーションを実行
        return Validator::make(
            $data,
            $rules,
            $request->messages(),
            $request->attributes()
        );
    }

    /**
     * バリデーションエラーメッセージが期待通りか検証する
     *
     * @param  array<string, string> $actualMessages  実際のエラーメッセージ
     * @param  string                $expectedMessage 期待するエラーメッセージ
     * @return void
     */
    protected function assertValidationMessageEquals(array $actualMessages, string $expectedMessage): void
    {
        $this->assertSame(
            $expectedMessage,
            $actualMessages[array_search($expectedMessage, $actualMessages, true)]
        );
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
