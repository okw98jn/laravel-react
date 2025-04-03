<?php

namespace App\Http\Controllers\Auth;

use App\Dto\Auth\AuthenticatedSession\StoreDto;
use App\Facades\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthenticatedSession\StoreRequest;
use App\Http\Resources\AuthUserResource;
use App\UseCases\Auth\AuthenticatedSession\DestroyUseCase;
use App\UseCases\Auth\AuthenticatedSession\StoreUseCase;
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
        $dto = StoreDto::fromArray($request->validated());

        $user = $useCase->handle($dto);

        $request->session()->regenerate();

        return ApiResponse::success([
            'user' => new AuthUserResource($user),
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
        $useCase->handle();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return ApiResponse::success([], Response::HTTP_NO_CONTENT);
    }
}
