<?php

namespace App\Http\Controllers\Auth;

use App\Facades\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\UseCases\Auth\AuthUser\ShowUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class AuthUserController extends Controller
{
    /**
     * ログインユーザーを取得
     *
     * @param  ShowUseCase  $useCase
     * @return JsonResponse
     */
    public function show(ShowUseCase $useCase): JsonResponse
    {
        $user = $useCase->handle();

        return ApiResponse::success([
            'user' => new UserResource($user),
        ], Response::HTTP_OK);
    }
}
