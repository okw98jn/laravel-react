#!/bin/bash

UI_MODE=false

# オプション引数の処理
while getopts ":u" opt; do
  case $opt in
    u)
      UI_MODE=true
      ;;
    \?)
      echo "無効なオプション: -$OPTARG" >&2
      exit 1
      ;;
  esac
done
shift $((OPTIND-1))

export APP_ENV=testing
export DB_DATABASE=laravel-db-test

# テスト用データベースをリセットしてマイグレーションを実行
php artisan migrate:fresh --env=testing

# E2Eテスト用のシーダーを実行
php artisan db:seed --class=E2ETestSeeder --env=testing

npm run build

php artisan serve --host=localhost --port=8080 &
SERVER_PID=$!

# E2Eテストを実行
if [ "$UI_MODE" = true ]; then
  echo "UIモードでテストを実行します"
  npx playwright test --ui-host=0.0.0.0 "$@"
else
  echo "通常モードでテストを実行します"
  npx playwright test "$@"
fi

# バックグラウンドで実行したサーバープロセスを終了
kill $SERVER_PID