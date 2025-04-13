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

# フロントエンド（React）について
## ディレクトリ構成

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

## ルーティング (TanStack Router)

このプロジェクトでは、フロントエンドのルーティングに [TanStack Router](https://tanstack.com/router/latest) を使用しています。
**ファイルベースルーティング** という仕組みを採用しているため、`src/resources/ts/routes/` ディレクトリ内のファイル構造によって自動的にルーティングが定義されます。

### ファイルベースルーティングの仕組み

-   **`src/resources/ts/routes/` が基準**: このディレクトリがルーティング定義のルート（起点）となります。
-   **ファイル/ディレクトリ構造がURLに対応**: `routes/` 内のファイルやディレクトリの階層構造が、そのままアプリケーションのURLパスに対応します。
    -   `routes/index.tsx` → `/` (ルートパス)
    -   `routes/hoge/index.tsx` → `/hoge`
-   **`__root.tsx`**: `routes/` 直下に置かれる特別なファイルです。アプリケーション全体の **ルートレイアウト** になります。その他、404ページやエラーページの設定もここで行います。
-   **レイアウトファイル (`route.tsx`)**: ルートで共通のレイアウトを適用したい場合に使用します。例えば `routes/hoge/route.tsx` を作成すると、`/hoge/*` 以下のすべてのルートに共通のレイアウトを適用できます。
-   **パスのないレイアウトルート (`_auth`)**: 接頭辞に`_`を付けると、URLには影響せずに子ルートをまとめることができます。

### 自動生成される `routeTree.gen.ts`

-   開発中に `routes/` ディレクトリ内のファイルを追加・変更・削除すると、TanStack Router のツール（Viteプラグイン）がそれを検知し、**自動的に `src/resources/ts/routeTree.gen.ts` というファイルを生成・更新します**。
-   このファイルには、`routes/` の構造に基づいたルーティング設定がコードとして書き出されます。
-   アプリケーションは、`app.tsx` で `routeTree.gen.ts` をインポートしてルーターを初期化します。
-   **重要**: `routeTree.gen.ts` は自動生成されるファイルなので、**手動で編集しないでください**。編集しても、次にファイル構造が変更された際に上書きされてしまいます。

詳細は [TanStack Router のドキュメント](https://tanstack.com/router/latest/docs/framework/react/overview) を参照してください。

## フォーム操作 (React Hook Form + Zod)

このプロジェクトでは、フォームの状態管理とバリデーションに以下のライブラリを組み合わせて使用しています。

-   **[React Hook Form](https://react-hook-form.com/):** フォームの状態管理、入力値の取得、送信処理、エラーハンドリングなどを効率的に行うためのライブラリです。
-   **[Zod](https://zod.dev/):** TypeScript ファーストのスキーマ定義・バリデーションライブラリです。フォームの入力値に対するバリデーションルールを型安全に定義できます。
-   **[shadcn/ui の Form コンポーネント](https://ui.shadcn.com/docs/components/form):** React Hook Form と Zod を簡単に連携させ、`FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage` といったコンポーネントを使って構造化されたフォームを構築するためのコンポーネントです。
(このプロジェクトでは、`src/resources/ts/components/form`にフォーム用のコンポーネントを格納しています)

### 実装パターン

基本的な実装フローは以下のようになります。

1.  **Zod スキーマ定義**: フォームの各フィールドに対するバリデーションルールを Zod を使って定義します。このスキーマから TypeScript の型も推論できます。
    ```typescript
    // resources/ts/features/hoge/schema/create.ts
    import { z } from 'zod';

    export const hogeSchema = z.object({
      // エラーメッセージは、src/resources/ts/locales/ja/zod.jsonで日本語化しているので、基本的には個別で設定する必要はありません。
      // name = 名前 などのフィールド名の日本語は、src/resources/ts/locales/ja/attributes.jsonに追記してください。
      name: z.string().min(1),
      // 個別にエラーメッセージを設定する場合は以下のように指定してください。
      email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
      // ... 他のフィールド
    });

    export type HogeSchemaType = z.infer<typeof hogeSchema>;

    // この型が取得できます
    type HogeSchemaType = {
      name: string;
      email: string;
    }
    ```
2.  **`useForm` フックの使用**: React Hook Form の `useForm` フックを呼び出します。この際に `resolver` オプションに Zod スキーマを渡すことで、フォームのバリデーションが Zod スキーマに基づいて行われるようになります。
    ```typescript
    // resources/ts/features/hoge/hooks/use-create-form.ts
    // フォーム操作のロジックはカスタムフックに切り出します

    export function useCreateForm() {
      const form = useForm<HogeSchemaType>({
        // ここでzodと連携し、作成したスキーマのルールでバリデーションが行われる
        resolver: zodResolver(hogeSchema),
        // 初期値
        defaultValues: {
          name: '',
          email: '',
          // ...
        },
      });

      // `form` オブジェクトからは、フォーム操作の様々な関数や状態が提供されます。
      // 以下は、使用頻度が高そうな関数です。
      const { reset, watch, setError, setValue } = form;

      // 1. reset: フォームの状態を指定した値（またはデフォルト値）にリセットします。
      // 例: キャンセルボタンクリック時にフォームを初期状態に戻す
      reset(); // 引数なしでデフォルト値にリセット
      // reset({ name: '新しい名前', email: 'new@example.com' }); // 特定の値にリセットも可能

      // 2. watch: 指定したフィールドの値の変更を監視します。
      // 例: name フィールドの値が変わるたびにコンソールに出力する
      const watchedName = watch('name');
      React.useEffect(() => {
        console.log('Nameフィールドの値:', watchedName);
      }, [watchedName]);
      // 引数なしで watch() を呼び出すと、フォーム全体の値を監視します。

      // 3. setError: 手動で特定のフィールドにエラーを設定します。
      // 例: API送信後にバックエンドからバリデーションエラーが返ってきた場合に設定する
      const handleApiError = (errors: Record<string, string[]>) => {
        Object.entries(errors).forEach(([fieldName, messages]) => {
          setError(fieldName as keyof HogeSchemaType, {
            type: 'manual', // または 'server'
            message: messages.join(', '),
          });
        });
      };

      // 4. setValue: 特定のフィールドの値をプログラム的に変更します。
      // 例: 特定のボタンクリックで email フィールドに値を設定する
      const handleSetEmail = () => {
        setValue('email', 'preset@example.com', {
          shouldValidate: true, // 値設定後にバリデーションを実行するかどうか
          shouldDirty: true, // フォームが変更されたとマークするかどうか
        });
      };

      // フォーム送信処理。handleSubmit はバリデーション成功時のみ onSubmit 関数を実行します。
      const onSubmit = form.handleSubmit((formData) => {
        console.log('サブミットされました', formData);
        // ここで API 送信などの非同期処理を行う
        // 例: submitToApi(formData).catch(handleApiError);
      });

      return { form, onSubmit };
    }
    ```
3.  Formを構築: `shadcn/ui` が提供する `Form` コンポーネントと関連コンポーネント (`FormField`, `FormItem` など) を使ってフォームの見た目を構築し、各入力フィールドを `useForm` フックのインスタンス (`form`) と連携させます。
    ```tsx
    // src/resources/ts/features/hoge/components/create-hoge.tsx

    // 2.で作成したカスタムフックから必要な処理を取得
    const { form, onSubmit } = useCreateForm();

    // FormInputコンポーネントは、このプロジェクト用にshadcn/uiのコンポーネントをラップした共通コンポーネント
    // FormInput<HogeSchemaType>のようにジェネリクス型を使用すると、HogeSchemaTypeに定義していないname属性を指定した場合にtypescriptがエラーを出してくれます
    return (
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <FormInput<HogeSchemaType>
            name="name"
            label="名前"
            type="text"
            autoComplete="name"
            placeholder="名前を入力してください"
          />
          <FormInput<HogeSchemaType>
            name="email"
            label="メールアドレス"
            type="text"
            autoComplete="email"
            placeholder="メールアドレスを入力してください"
          />
          {/* 他のフィールドも同様に */}
          <Button type="submit">送信</Button>
        </form>
      </Form>
    );
    ```

詳細は以下のドキュメントを参照してください。
-   [React Hook Form Documentation](https://react-hook-form.com/)
-   [Zod Documentation](https://zod.dev/)
-   [shadcn/ui Form Component](https://ui.shadcn.com/docs/components/form)

## テーブル操作 (TanStack Table)

このプロジェクトでは、データの表形式表示に [TanStack Table (v8)](https://tanstack.com/table/latest) を使用しています。

TanStack Table は「ヘッドレス UI」ライブラリであり、テーブルのロジック、状態管理、API を提供しますが、特定のマークアップやスタイルは提供しません。これにより、HTML 構造やスタイリング（CSS、UI ライブラリなど）を自由に制御できます。

このプロジェクトでは、TanStack Table のロジックと `shadcn/ui` の Table コンポーネント (`<Table>`, `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableHead>`, `<TableCell>`) を組み合わせて、見た目と機能を実装します。

### 実装パターン

基本的な実装フローは以下のようになります。

1.  **カラム定義 (`ColumnDef`)**: 表示するデータの各列を定義します。
    TanStack Table では、`createColumnHelper` を使うと、型安全性を高めながらカラム定義を簡潔に記述できます。
    `helper.accessor` でデータオブジェクトのキーを指定し、`header` や `cell` で表示内容を定義します。
    `helper.display` を使うと、データに直接紐づかない列（アクションボタンなど）を定義できます。
    ```typescript
    // 例: src/features/hoge/components/columns.tsx
    import { createColumnHelper } from "@tanstack/react-table";
    import { Hoge } from "@/features/hoge/types";
    import { Button } from "@/components/ui/button";
    import { ArrowUpDown } from "lucide-react";

    const columnHelper = createColumnHelper<User>(); // Hoge 型でヘルパーを作成

    export const columns = [
      // 'id' キーに対応する列を定義
      columnHelper.accessor("id", {
        header: "ID",
        // cell: info => info.getValue(), // デフォルトで値が表示されるので通常は不要
      }),
      // 'name' キーに対応する列を定義
      columnHelper.accessor("name", {
        // ヘッダーをクリック可能にし、ソートアイコンを表示する例
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              名前
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        // cell: info => info.getValue(), // デフォルト表示
      }),
      // 'email' キーに対応する列を定義
      columnHelper.accessor("email", {
        header: "メールアドレス",
      }),
      // アクションボタンなど、データに直接紐づかない表示用の列を定義
      columnHelper.display({
        id: "actions",
        header: "操作", // ヘッダー名を追加
        cell: ({ row }) => {
          const hoge = row.original; // `row.original`で行データにアクセス
          return (
            <Button variant="outline" size="sm" onClick={() => alert(`編集: ${hoge.name}`)}>
              編集
            </Button>
          );
        },
      }),
    ];
    ```
2.  **`useReactTable` フックの使用**: テーブルを表示するコンポーネント内で `useReactTable` フックを呼び出します。`data` に表示するデータの配列、`columns` に 1. で定義したカラム定義を渡します。必要に応じて、ソート、フィルタリング、ページネーション、行選択などの状態管理や機能の有効化を行います。
    ```typescript
    // 例: src/features/hoge/components/hoge-table.tsx

    // テーブルを作成
    const table = useReactTable({
      data: data?.data.hoge ?? [], // APIから取得したデータ
      columns, // 1.で作成したカラム定義
      getCoreRowModel: getCoreRowModel(), // 必要な関数。基本的に渡さないといけない
      manualPagination: true, // APIと連携してページネーションを行う場合に使用
      manualSorting: true, // APIと連携してソートを行う場合に使用
      onRowSelectionChange: setRowSelection, // 行が選択されたり、解除されたときに実行
      onColumnVisibilityChange: setColumnVisibility, // カラムの表示、非表示が変化したときに実行
      onPaginationChange: (updater) => handlePaginationChange(updater), // ページネーションに関連するパラメータ(ページインデックス、ページサイズ)が変化したときに実行
      onSortingChange: (updater) => handleSortingChange(updater), // ソート条件が変化したときに実行
      rowCount: data?.data.paginate.total, // テーブルの全行数 manualPaginationがtrueの場合渡す必要があり
      state: {
        rowSelection, // 選択中の行の状態
        pagination, // ページネーションの状態
        columnVisibility, // カラムの表示、非表示状態
        sorting, // ソート状態
      },
    });

    // DataTableコンポーネントはこのプロジェクトで使用する基本のテーブルコンポーネント
    return <DataTable table={table} />
    ```

### 主な機能

TanStack Table は多くの機能を提供しており、`useReactTable` のオプションで有効化できます。

-   **ソート (`getSortedRowModel`)**: 列ヘッダーをクリックしてデータを並び替えます。
-   **フィルタリング (`getFilteredRowModel`)**: 特定の条件でデータを絞り込みます。
-   **ページネーション (`getPaginationRowModel`)**: 大量のデータをページに分割して表示します。
-   **行選択 (`enableRowSelection`)**: ユーザーがテーブルの行を選択できるようにします。
-   **カラムの表示/非表示**: ユーザーが表示する列を選択できるようにします。
-   **カラムの並び替え**: ユーザーが列の順序を変更できるようにします。

これらの機能の実装例は、`shadcn/ui` のドキュメントにある [DataTable](https://ui.shadcn.com/docs/components/data-table) の例が非常に参考になります。

詳細は以下のドキュメントを参照してください。
-   [TanStack Table Documentation](https://tanstack.com/table/latest)
-   [shadcn/ui DataTable Example](https://ui.shadcn.com/docs/components/data-table)