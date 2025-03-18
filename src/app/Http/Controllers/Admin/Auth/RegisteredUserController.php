<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Facades\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\RegisteredUser\StoreRequest;
use App\Http\Resources\Admin\UserResource;
use App\UseCases\Admin\Auth\RegisteredUser\StoreUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class RegisteredUserController extends Controller
{
    /**
     * ユーザー登録
     *
     * @param  StoreRequest $request
     * @param  StoreUseCase $useCase
     * @return JsonResponse
     */
    public function store(StoreRequest $request, StoreUseCase $useCase): JsonResponse
    {
        /** @var array{name: string, email: string, password: string} $validated */
        $validated = $request->validated();

        $user = $useCase->handle($validated['name'], $validated['email'], $validated['password']);

        return ApiResponse::success([
            'user' => new UserResource($user),
        ], Response::HTTP_CREATED);
    }
}
