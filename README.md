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

# githooks
## pre-commit
```bash
#!/bin/sh

make fixer
FIXER_STATUS=$?

make biome
BIOME_STATUS=$?

if [ $FIXER_STATUS -ne 0 ]; then
  exit 1
fi

if [ $BIOME_STATUS -ne 0 ]; then
  exit 1
fi

exit 0
```
```
chmod +x pre-commit
```

## pre-push
```bash
#!/bin/sh

make stan
STAN_STATUS=$?

if [ $STAN_STATUS -ne 0 ]; then
  exit 1
fi

make test
TEST_STATUS=$?

if [ $TEST_STATUS -ne 0 ]; then
  exit 1
fi

make e2e
E2E_STATUS=$?

if [ $E2E_STATUS -ne 0 ]; then
  exit 1
fi

exit 0
```
```
chmod +x pre-push
```

# フロントエンド（React）のディレクトリ構成

`src/resources/ts` ディレクトリにReactのソースコードが格納されています。
以下は各ディレクトリ/ファイルの主な役割になります。

```plaintext
src/resources/ts/
├── api/             # アプリケーション全体で使用するAPI処理
├── assets/          # 画像、フォントなどの静的ファイル
├── components/      # 再利用可能なUI部品（コンポーネント）
│   └── ui/          # shadcn/ui でインストールしたコンポーネント
│   └──   /          # アプリケーション全体で使うコンポーネント
├── constants/       # アプリケーション全体で使う定数 (例: HTTPステータス, 設定値)
├── e2e/             # E2Eテスト (Playwright)
├── features/        # 機能ごとの関連ファイル (別途説明)
├── hooks/           # アプリケーション全体で使用する再利用可能なカスタムフック (ロジックの部品化、例: useFilter(クエリパラメータの共通処理))
├── lib/             # 外部ライブラリの設定や補助関数 (例: axios設定, ルーター設定)
├── locales/         # zodバリデーションメッセージ日本語化の翻訳ファイル
├── routes/          # 各画面とルーティング設定 (ファイル構造がURLに対応)
├── store/           # アプリケーション全体の状態管理 (例: Zustandで認証状態の管理)
├── types/           # アプリケーション全体で使用する型定義 (例: ページネーション型, サジェスト型)
├── utils/           # 汎用的な補助関数 (ヘルパー関数、例: オブジェクト定数からセレクトボックスで使用するオプションへの変換)
├── app.tsx          # アプリ全体のルートコンポーネント (Provider設定)
├── main.tsx         # アプリのエントリーポイント (ReactをHTML(index.blade.php)に描画)
└── routeTree.gen.ts # ルーティング定義 (TanStack Routerが自動生成、直接編集しない)
```

### `features/` ディレクトリの内部構成例

`features/` ディレクトリは、機能単位で関連ファイルをまとめます。以下は、`shop`（店舗）機能の例です。

```plaintext
src/resources/ts/features/shop/
├── api/             # 店舗機能で使うAPI処理
├── components/      # 店舗機能で使うUIコンポーネント
├── constants/       # 店舗機能で使う定数
├── hooks/           # 店舗機能で使うカスタムフック
├── schema/          # 店舗機能で使うzodバリデーションスキーマ
└── types/           # 店舗機能で使う型定義
```

# ルーティング (TanStack Router)

このプロジェクトでは、フロントエンドのルーティングに [TanStack Router](https://tanstack.com/router/latest) を使用しています。
**ファイルベースルーティング** という仕組みを採用しているため、`src/resources/ts/routes/` ディレクトリ内のファイル構造によって自動的にルーティングが定義されます。

## ファイルベースルーティングの仕組み

-   **`src/resources/ts/routes/` が基準**: このディレクトリがルーティング定義のルート（起点）となります。
-   **ファイル/ディレクトリ構造がURLに対応**: `routes/` 内のファイルやディレクトリの階層構造が、そのままアプリケーションのURLパスに対応します。
    -   `routes/index.tsx` → `/` (ルートパス)
    -   `routes/hoge/index.tsx` → `/hoge`
-   **`__root.tsx`**: `routes/` 直下に置かれる特別なファイルです。アプリケーション全体の **ルートレイアウト** になります。その他、404ページやエラーページの設定もここで行います。
-   **レイアウトファイル (`route.tsx`)**: ルートで共通のレイアウトを適用したい場合に使用します。例えば `routes/hoge/route.tsx` を作成すると、`/hoge/*` 以下のすべてのルートに共通のレイアウトを適用できます。
-   **パスのないレイアウトルート (`_auth`)**: 接頭辞に`_`を付けると、URLには影響せずに子ルートをまとめることができます。

## 自動生成される `routeTree.gen.ts`

-   開発中に `routes/` ディレクトリ内のファイルを追加・変更・削除すると、TanStack Router のツール（Viteプラグイン）がそれを検知し、**自動的に `src/resources/ts/routeTree.gen.ts` というファイルを生成・更新します**。
-   このファイルには、`routes/` の構造に基づいたルーティング設定がコードとして書き出されます。
-   アプリケーションは、`app.tsx` で `routeTree.gen.ts` をインポートしてルーターを初期化します。
-   **重要**: `routeTree.gen.ts` は自動生成されるファイルなので、**手動で編集しないでください**。編集しても、次にファイル構造が変更された際に上書きされてしまいます。

詳細は [TanStack Router のドキュメント](https://tanstack.com/router/latest/docs/framework/react/overview) を参照してください。
