<?php

namespace App\Http\Controllers\Auth;

use App\Dto\Auth\RegisteredUser\StoreDto;
use App\Facades\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisteredUser\StoreRequest;
use App\Http\Resources\UserResource;
use App\UseCases\Auth\RegisteredUser\StoreUseCase;
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
        $dto = StoreDto::fromArray($request->validated());

        $user = $useCase->handle($dto);

        return ApiResponse::success([
            'user' => new UserResource($user),
        ], Response::HTTP_CREATED);
    }
}
