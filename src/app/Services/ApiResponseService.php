<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

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
}
