<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response as HttpResponse;

class ApiResponseServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * プロジェクトでレスポンスを共通化
     */
    public function boot(): void
    {
        Response::macro('success', function (JsonResource $data, int $status = HttpResponse::HTTP_OK) {
            return Response::json([
                'success' => true,
                'data'    => $data,
            ], $status);
        });

        Response::macro('error', function (string $message, array $error = [], int $status = HttpResponse::HTTP_INTERNAL_SERVER_ERROR) {
            return Response::json([
                'success' => false,
                'message' => $message,
                'error'   => $error,
            ], $status);
        });
    }
}
