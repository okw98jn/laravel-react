# Laravelテストコード設計ルール

## 目次

1. [基本構成](#基本構成)
2. [テストの種類](#テストの種類)
3. [テストの実装パターン](#テストの実装パターン)
4. [テストの実装ルール](#テストの実装ルール)
5. [テストデータの準備](#テストデータの準備)
6. [アサーション](#アサーション)
7. [テストの実行方法](#テストの実行方法)

## 基本構成

プロジェクトのテストは `src/tests` ディレクトリに配置され、以下の構成になっています：

```
tests/
├── Feature/              # 機能テスト（APIエンドポイントやミドルウェアなど）
│   ├── User/             # ユーザー関連の機能テスト
│   ├── Auth/             # 認証関連の機能テスト
│   │   ├── AuthUser/     # 認証ユーザー機能テスト
│   │   ├── AuthenticatedSession/ # 認証セッション機能テスト
│   │   └── RegisteredUser/ # ユーザー登録機能テスト
│   ├── Middleware/       # ミドルウェアのテスト
│   └── ExceptionHandlerTest.php # 例外ハンドラーのテスト
├── Unit/                 # ユニットテスト（個別のクラスや関数）
│   ├── Services/         # サービスクラスのテスト
│   ├── Requests/         # フォームリクエストのバリデーションテスト
│   │   ├── AbstractRequest.php # 抽象リクエストテストクラス
│   │   ├── User/         # ユーザーリクエストテスト
│   │   └── Auth/         # 認証リクエストテスト
│   └── UseCases/         # ユースケースのテスト
│       ├── User/         # ユーザー関連のユースケーステスト
│       └── Auth/         # 認証関連のユースケーステスト
└── TestCase.php          # すべてのテストの基底クラス
```

## テストの種類

各テストディレクトリは以下の責任を持ちます：

### Feature Tests
- アプリケーションの実際の機能や動作をエンドツーエンドでテストします
- HTTPリクエスト/レスポンスのフルスタックテストを行います
- ルート、コントローラー、ミドルウェア、レスポンスなど一連の流れをテストします
- 例：`tests/Feature/Auth/AuthUser/ShowTest.php` - 認証ユーザー情報取得APIのテスト

### Unit Tests
- 単一のクラスや関数の振る舞いを分離してテストします
- モデル、リポジトリ、サービス、ユースケースなどの個別コンポーネントをテストします
- 依存関係はモックやスタブを用いて分離します
- 例：`tests/Unit/UseCases/Auth/AuthUser/ShowUseCaseTest.php` - ユーザー情報取得ユースケースのテスト

## テストの実装パターン

### 共通パターン

1. **AAA（Arrange-Act-Assert）パターン**
   - Arrange（準備）：テストに必要なデータやオブジェクトを準備
   - Act（実行）：テスト対象のメソッドを実行
   - Assert（検証）：結果を検証

2. **データプロバイダーの活用**
   - 複数のテストケースを効率的に実行するためのデータプロバイダーを使用
   - 特に入力バリデーションテストで有効

3. **モックとスタブの活用**
   - 外部依存を持つクラスのテストで、依存先をモックまたはスタブに置き換え
   - Laravel の Mockery や PHPUnit のモック機能を活用

### コード例

#### Feature テスト例（ユーザー情報取得）
```php
public function test_authenticated_user_can_retrieve_own_information(): void
{
    // 準備（Arrange）
    $user = User::factory()->create();
    $this->actingAs($user);

    // 実行（Act）
    $response = $this->getJson('/api/auth-user');

    // 検証（Assert）
    $response->assertStatus(Response::HTTP_OK);
    $response->assertExactJson([
        'data' => [
            'user' => [
                'id'     => $user->id,
                'name'   => $user->name,
                'email'  => $user->email,
                'gender' => $user->gender,
                'status' => $user->status,
                'memo'   => $user->memo,
            ],
        ],
        'success' => true,
    ]);
}
```

#### Unit テスト例（ApiResponseService）
```php
public function test_success_with_array_data(): void
{
    // 準備（Arrange）
    $testData = ['id' => 1, 'name' => 'テスト'];
    $apiResponseService = new ApiResponseService();

    // 実行（Act）
    $response = $apiResponseService->success($testData);

    // 検証（Assert）
    $this->assertEquals(HttpResponse::HTTP_OK, $response->getStatusCode());
    $this->assertEquals([
        'success' => true,
        'data'    => $testData,
    ], json_decode($response->getContent(), true));
}
```

## テストの実装ルール

### 基本ルール

1. すべてのテストは独立して実行可能であること
2. テストは副作用を残さないこと（テスト実行後にデータベースがクリーンアップされること）
3. テストは可能な限り高速であること
4. 各テストは明確に1つの機能や条件をテストすること
5. テストケースは「準備（Arrange）」「実行（Act）」「検証（Assert）」の3ステップで構成すること

### ユースケーステスト

1. テストクラスでは `RefreshDatabase` トレイトを使用してデータベースをリセット
2. `setUp()` メソッドでテスト対象のユースケースクラスをインスタンス化
3. 各テストメソッドは特定の条件と結果をテスト
4. 正常系と異常系の両方をテスト

```php
// 例：src/tests/Unit/UseCases/Auth/AuthUser/ShowUseCaseTest.php
protected function setUp(): void
{
    parent::setUp();
    $this->useCase = new ShowUseCase();
}

public function handle_returns_authenticated_user(): void
{
    // テストユーザー作成
    $expectedUser = User::factory()->create();

    // ユーザーをログイン状態にする
    Auth::login($expectedUser);

    $actualUser = $this->useCase->handle();

    // 取得したユーザーが期待通りであることを確認
    $this->assertEquals($expectedUser->id, $actualUser->id);
}
```

### リクエストバリデーションテスト

1. 共通のテストロジックは `AbstractRequest` クラスに実装
2. 各リクエストクラスは `validationRules` メソッドと `validationMessages` メソッドを実装
3. バリデーションの成功ケースと失敗ケースを網羅的にテスト
4. データプロバイダーを使用して複数のケースを効率的にテスト

```php
// 例：src/tests/Unit/Requests/User/StoreRequestTest.php
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
        // 他のバリデーションケース
    ];
}

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
```

## テストデータの準備

1. **ファクトリーの活用**
   - Laravel のモデルファクトリを使用してテストデータを作成
   - テストデータは現実的な値を持つべき
   - 関連するモデルも一緒に作成する必要がある場合は `has` や `for` メソッドを活用

2. **シーダーの活用**
   - 複雑なデータ構造が必要な場合はシーダーを活用
   - テストデータベース固有のシーダーを作成することも検討

3. **モックデータの活用**
   - 外部サービスとの連携をテストする場合はモックレスポンスを用意
   - HTTPクライアントのモックは `Http::fake()` を使用

## アサーション

1. **明確なアサーション**
   - テストの意図が明確になるようなアサーションを使用
   - 複数の条件を検証する場合は、それぞれを個別のアサーションとして記述

2. **適切なアサーションメソッドの選択**
   - `assertEquals` - 値が等しいことを検証
   - `assertJsonStructure` - JSONレスポンスの構造を検証
   - `assertDatabaseHas` - データベースにレコードが存在することを検証
   - `assertInstanceOf` - オブジェクトが指定したクラスのインスタンスであることを検証

3. **明確なエラーメッセージ**
   - アサーションが失敗した場合に分かりやすいエラーメッセージを提供

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

# 特定のグループのテストのみ実行（アノテーション使用時）
php artisan test --group=auth

# 並列実行（PHP 8.0以降）
php artisan test --parallel

# カバレッジレポートの生成（XDebug必須）
XDEBUG_MODE=coverage php artisan test --coverage
```

### テストカバレッジの監視

テストカバレッジを監視するために、Codecovを使用しています。プルリクエスト時にカバレッジレポートが生成され、カバレッジが一定の閾値を下回る場合は警告が表示されます。

#### カバレッジ目標
- 機能（Feature）テスト: 最低80%
- ユニット（Unit）テスト: 最低90%
- 全体: 最低85%
