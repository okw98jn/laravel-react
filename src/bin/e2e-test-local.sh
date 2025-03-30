#!/bin/bash

export APP_ENV=testing
export DB_DATABASE=laravel-db-test

# テスト用データベースをリセットしてマイグレーションを実行
php artisan migrate:fresh --env=testing

# E2Eテスト用のシーダーを実行
php artisan db:seed --class=E2ETestSeeder --env=testing

# E2Eテストを実行
npx playwright test "$@"