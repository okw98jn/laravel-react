<?php

namespace App\Exceptions;

use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Throwable;

final class Handler
{
    /**
     * エラーレスポンスを共通化
     *
     * @param  Exceptions $exceptions
     * @return void
     */
    public function handleExceptions(Exceptions $exceptions): void
    {
        $exceptions->render(function (UnauthorizedHttpException $e, Request $request) {
            return $this->jsonResponse(__('error.401'), [], Response::HTTP_UNAUTHORIZED);
        });

        $exceptions->render(function (AccessDeniedHttpException $e, Request $request) {
            return $this->jsonResponse(__('error.403'), [], Response::HTTP_FORBIDDEN);
        });

        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            return $this->jsonResponse(__('error.404'), [], Response::HTTP_NOT_FOUND);
        });

        $exceptions->render(function (ValidationException $e, Request $request) {
            $errors = [];

            // フロントで扱いやすいようにエラーメッセージを整形
            foreach ($e->errors() as $field => $messages) {
                /** @var array<int, string> $messages */
                $errors[$field] = $messages[0];
            }

            return $this->jsonResponse(__('error.422'), $errors, Response::HTTP_UNPROCESSABLE_ENTITY);
        });

        $exceptions->render(function (Throwable $e, Request $request) {
            return $this->jsonResponse(__('error.500'), [
                'error' => config('app.debug') ? $e->getMessage() : '',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        });
    }

    /**
     * エラーレスポンスを共通化
     *
     * @param  string       $message
     * @param  mixed        $body
     * @param  int          $status
     * @return JsonResponse
     */
    protected function jsonResponse(string $message, $body, int $status): JsonResponse
    {
        return response()->json([
            'message' => $message,
            'body'    => $body,
        ], $status);
    }
}
