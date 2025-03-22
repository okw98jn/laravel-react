# Laravelテストコード設計ルール

## 目次

1. [基本構成](#基本構成)
2. [テストの種類](#テストの種類)
3. [テストの命名規則](#テストの命名規則)
4. [テストの実装ルール](#テストの実装ルール)
5. [テストデータの準備](#テストデータの準備)
6. [アサーション](#アサーション)
7. [テストの実行方法](#テストの実行方法)

## 基本構成

プロジェクトのテストは `src/tests` ディレクトリに配置され、以下の構成になっています：

```
tests/
├── Feature/            # 機能テスト（APIエンドポイントやミドルウェアなど）
├── Unit/               # ユニットテスト（個別のクラスや関数）
│   ├── Requests/       # フォームリクエストのバリデーションテスト
│   └── UseCases/       # ユースケースのテスト
└── TestCase.php        # すべてのテストの基底クラス
```

## テストの種類

### ユニットテスト（Unit Tests）

- 個別のクラスや関数の振る舞いをテストします
- 依存関係はモックまたはスタブを使用して分離します
- ディレクトリ構造はアプリケーションコードと同じ構造に従います
- 例：`tests/Unit/UseCases/Auth/AuthUser/ShowUseCaseTest.php`

### 機能テスト（Feature Tests）

- APIエンドポイント、ミドルウェア、例外ハンドラーなどの統合的な機能をテストします
- 実際のHTTPリクエスト/レスポンスをシミュレートします
- フロントエンドからのリクエストを模倣してシステムの統合をテストします
- 例：`tests/Feature/Auth/RegisteredUser/StoreTest.php`

## テストの命名規則

### テストクラス

- テスト対象クラスの名前 + `Test` サフィックスを使用します
- 例：`ShowUseCase` → `ShowUseCaseTest`

### テストメソッド

テストメソッドの命名には以下のパターンを使用します：

1. **標準パターン**：`test_[テスト対象の動作]_[期待される結果]`
   - 例：`test_can_register_with_valid_data()`
   - 例：`test_cannot_register_with_duplicate_email()`

2. **日本語コメント付きパターン**（PHPDocにテストの目的を日本語で記述）：
   ```php
   /**
    * ログインユーザーが取得できることをテスト
    */
   public function handle_returns_authenticated_user(): void
   ```

## テストの実装ルール

### 基本ルール

1. すべてのテストは独立して実行可能であること
2. テストは副作用を残さないこと（テスト実行後にデータベースがクリーンアップされること）
3. テストは可能な限り高速であること
4. 各テストは明確に1つの機能や条件をテストすること

### ユースケーステスト

1. テストクラスでは `RefreshDatabase` トレイトを使用してデータベースをリセット
2. `setUp()` メソッドでテスト対象のユースケースクラスをインスタンス化
3. 各テストメソッドは特定の条件と結果をテスト
4. 正常系と異常系の両方をテスト

```php
class ShowUseCaseTest extends TestCase
{
    use RefreshDatabase;

    private ShowUseCase $useCase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->useCase = new ShowUseCase();
    }

    // テストメソッド
}
```

### リクエストバリデーションテスト

1. 共通のテストロジックは `AbstractRequest` クラスに実装
2. 各リクエストクラスは `validationFailureDataProvider` メソッドでテストケースを提供
3. すべてのバリデーションルールに対するテストを実装

## テストデータの準備

### ファクトリの活用

- テストデータの作成には Laravel のファクトリを使用
- 例：`User::factory()->create()`

### テストケースのバリエーション

データプロバイダーを活用して複数のテストケースを実行：

```php
#[DataProvider('validationFailureDataProvider')]
public function test_validation_should_fail(array $requestParams, string $expectedField, string $expectedMessage): void
{
    // テスト実装
}

public static function validationFailureDataProvider(): array
{
    return [
        '空のメールアドレス' => [
            [], // リクエストパラメータ
            'email', // バリデーション失敗フィールド
            'メールアドレスは必ず指定してください。', // バリデーション失敗メッセージ
        ],
        // 他のテストケース
    ];
}
```

## アサーション

### データベースアサーション

- `assertDatabaseHas()` - レコードが存在することを確認
- `assertDatabaseMissing()` - レコードが存在しないことを確認

### レスポンスアサーション

- `assertStatus()` - HTTPステータスコードを確認
- `assertJson()` - JSONレスポンスの内容を確認
- `assertJsonPath()` - JSONの特定のパスの値を確認

### 例外アサーション

- `expectException()` - 特定の例外が発生することを期待

## テストの実行方法

### 全テストの実行

```bash
cd src
php artisan test
```

### 特定のテストの実行

```bash
# 特定のテストファイルの実行
php artisan test tests/Unit/UseCases/Auth/AuthUser/ShowUseCaseTest.php

# 特定のテストグループの実行
php artisan test --testsuite=Unit
php artisan test --testsuite=Feature
```

### フィルタリング

```bash
# 特定の名前を含むテストのみ実行
php artisan test --filter=test_can_register
```
