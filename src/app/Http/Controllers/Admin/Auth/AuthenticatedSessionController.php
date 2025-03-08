<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\AuthenticatedSession\StoreRequest;
use App\Http\Resources\Auth\AuthResource;
use App\UseCases\Admin\Auth\AuthenticatedSession\DestroyUseCase;
use App\UseCases\Admin\Auth\AuthenticatedSession\StoreUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthenticatedSessionController extends Controller
{
    /**
     * ログイン
     *
     * @param  StoreRequest $request
     * @param  StoreUseCase $useCase
     * @return AuthResource
     */
    public function store(StoreRequest $request, StoreUseCase $useCase): AuthResource
    {
        /** @var array{email: string, password: string} $credentials */
        $credentials = $request->validated();

        return new AuthResource($useCase->handle($request, $credentials));
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

        return response()->json(['message' => 'ログアウトしました']);
    }
}
