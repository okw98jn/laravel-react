<?php

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use RuntimeException;

final class CsvService
{
    /**
     * CSVダウンロード用コールバック
     *
     * @param  array<string>                       $headers CSVヘッダー
     * @param  Collection<int, mixed>|array<mixed> $data    CSVデータ
     * @return callable                            CSV生成用コールバック
     */
    public function csvDownloadCallback(array $headers, Collection|array $data): callable
    {
        return function () use ($headers, $data) {
            // ファイルポインタの開閉はここで完結
            $file = fopen('php://output', 'w');

            if ($file === false) {
                Log::error('CSVファイルの作成に失敗しました');
                throw new RuntimeException();
            }

            fputcsv($file, $headers);

            foreach ($data as $row) {
                fputcsv($file, (array) $row);
            }

            fclose($file);
        };
    }
}
