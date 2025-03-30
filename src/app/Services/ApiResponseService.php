<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Symfony\Component\HttpFoundation\Response as HttpResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

final class ApiResponseService
{
    /**
     * 成功時のレスポンス
     *
     * @param  JsonResource|array<mixed> $data
     * @param  int                       $status
     * @return JsonResponse
     */
    public function success(JsonResource|array $data, int $status = HttpResponse::HTTP_OK): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => $data,
        ], $status);
    }

    /**
     * エラー時のレスポンス
     *
     * @param  string       $message
     * @param  array<mixed> $error
     * @param  int          $status
     * @return JsonResponse
     */
    public function error(string $message, array $error = [], int $status = HttpResponse::HTTP_INTERNAL_SERVER_ERROR): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'error'   => $error,
        ], $status);
    }

    /**
     * CSVダウンロード用レスポンスを生成
     *
     * @param  string           $fileName ファイル名
     * @param  callable         $callback CSV生成処理を行うコールバック関数
     * @return StreamedResponse
     */
    public function csvDownload(string $fileName, callable $callback): StreamedResponse
    {
        return response()->streamDownload($callback, $fileName, [
            'Content-Type'        => 'text/csv',
            'Cache-Control'       => 'no-store, no-cache',
            'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
        ]);
    }
}
