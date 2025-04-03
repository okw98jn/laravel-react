# 環境構築

## セットアップ手順

1. 環境のセットアップと起動
   ```bash
   make setup
   ```

2. アプリケーションへのアクセス
   セットアップ完了後、以下のURLにアクセスできます
   - http://localhost:8080

### DevContainer

VSCodeユーザーはDevContainerの使用を推奨します
- ローカル環境にPHPのインストール不要
- PHPStanによる静的解析が自動実行
- PHP-CS-Fixerによる自動コード整形
- Laravel公式の拡張機能が使える

#### 設定手順

1. VSCodeに「Dev Containers」拡張機能をインストール
2. VSCodeの左下の緑色（青色）アイコンをクリックし、「Reopen in Container」を選択
3. コンテナのビルド完了まで待機（初回は数分かかることがあります）

### Laravel IDE Helper

Laravel IDE Helperを使用するとFacadeやモデルへのコード補完が有効になります。
セットアップ時に以下のヘルパーファイルが自動生成されます
- `_ide_helper.php` - Facadeのコード補完用
- `_ide_helper_models.php` - モデルのプロパティ・リレーション補完用

これらのファイルが不要な場合は削除しても問題ありません。

ヘルパーファイルを再生成するには次のコマンドを使用します
```bash
make ide
```

## テスト
### Laravel
```bash
make test
```

### コントローラーのテスト

コントローラーのテストは `tests/Feature/` ディレクトリに配置し、エンドポイントとしての振る舞いを検証します。
ここでは基本的にリクエストを投げて期待通りのレスポンス(Json)が返って来ることだけを検証します。
テストが遅くなるため、バリデーションやDBの確認など、細かいテストはここでは行いません。

### リクエストクラスのテスト

リクエストクラスのテストは `tests/Unit/Requests/` ディレクトリに配置します。これらのテストは主にバリデーションルールの動作を検証します。
各テストクラスで、`AbstractRequest`を継承し`validationFailureDataProvider()`、`getRequestClass()`、`getValidData()`を
実装してください。
基本的なテストはこれだけで書けると思います。