<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Facades\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\AuthenticatedSession\StoreRequest;
use App\Http\Resources\Admin\UserResource;
use App\UseCases\Admin\Auth\AuthenticatedSession\DestroyUseCase;
use App\UseCases\Admin\Auth\AuthenticatedSession\StoreUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * ログイン
     *
     * @param  StoreRequest $request
     * @param  StoreUseCase $useCase
     * @return JsonResponse
     */
    public function store(StoreRequest $request, StoreUseCase $useCase): JsonResponse
    {
        /** @var array{email: string, password: string} $credentials */
        $credentials = $request->validated();

        $user = $useCase->handle($request, $credentials);

        return ApiResponse::success([
            'user' => new UserResource($user),
        ], Response::HTTP_CREATED);
    }

    /**
     * ログアウト
     *
     * @param  Request        $request
     * @param  DestroyUseCase $useCase
     * @return JsonResponse
     */
    public function destroy(Request $request, DestroyUseCase $useCase): JsonResponse
    {
        $useCase->handle($request);

        return ApiResponse::success([], Response::HTTP_NO_CONTENT);
    }
}
