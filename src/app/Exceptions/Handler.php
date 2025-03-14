<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Throwable;
use App\Facades\ApiResponse;

final class Handler
{
    /**
     * エラーハンドラー
     *
     * @param  Exceptions $exceptions
     * @return void
     */
    public function handleExceptions(Exceptions $exceptions): void
    {
        $exceptions->render(function (UnauthorizedHttpException|AuthenticationException $e, Request $request) {
            return ApiResponse::error(__('error.401'), [], HttpResponse::HTTP_UNAUTHORIZED);
        });

        $exceptions->render(function (AccessDeniedHttpException $e, Request $request) {
            return ApiResponse::error(__('error.403'), [], HttpResponse::HTTP_FORBIDDEN);
        });

        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            return ApiResponse::error(__('error.404'), [], HttpResponse::HTTP_NOT_FOUND);
        });

        $exceptions->render(function (ValidationException $e, Request $request) {
            $errors = [];

            // フロントで扱いやすいようにエラーメッセージを整形
            foreach ($e->errors() as $field => $messages) {
                /** @var array<int, string> $messages */
                $errors[$field] = $messages[0];
            }

            return ApiResponse::error(__('error.422'), $errors, HttpResponse::HTTP_UNPROCESSABLE_ENTITY);
        });

        // 取りこぼしたくないのでThrowable
        // 静的解析の時点でエラーになりここまで来ないはずですが一応
        $exceptions->render(function (Throwable $e, Request $request) {
            return ApiResponse::error(
                __('error.500'),
                [config('app.debug') ? $e->getMessage() : ''],
                HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            );
        });
    }
}
