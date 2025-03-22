<?php

namespace App\UseCases\User;

use App\Facades\Csv;
use App\Models\User;

final class DownloadUseCase
{
    /**
     * CSVファイルを作成
     *
     * @return array{fileName: string, callback: callable}
     */
    public function handle(): array
    {
        return [
            'fileName' => $this->getFileName(),
            'callback' => Csv::csvDownloadCallback(
                $this->getHeaders(),
                $this->getCsvData()
            ),
        ];
    }

    /**
     * ファイル名を取得
     *
     * @return string
     */
    private function getFileName(): string
    {
        return 'users.csv';
    }

    /**
     * CSVヘッダーを設定
     *
     * @return array<string>
     */
    private function getHeaders(): array
    {
        return ['ID', '名前', 'メールアドレス', '作成日'];
    }

    /**
     * CSVデータを取得
     *
     * @return array<mixed>
     */
    private function getCsvData(): array
    {
        return User::all(['id', 'name', 'email', 'created_at'])->toArray();
    }
}
