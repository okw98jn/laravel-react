<?php

namespace App\Http\Controllers;

use App\DTO\User\IndexDTO;
use App\DTO\User\StoreDTO;
use App\Facades\ApiResponse;
use App\Http\Requests\User\IndexRequest;
use App\Http\Requests\User\StoreRequest;
use App\Http\Resources\UserResource;
use App\UseCases\User\IndexUseCase;
use App\UseCases\User\StoreUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * ユーザー一覧を取得
     *
     * @param  IndexRequest $request
     * @param  IndexUseCase $useCase
     * @return JsonResponse
     */
    public function index(IndexRequest $request, IndexUseCase $useCase): JsonResponse
    {
        $dto = IndexDTO::fromArray($request->validated());

        $result = $useCase->handle($dto);

        return ApiResponse::success([
            'users'    => UserResource::collection($result['users']),
            'rowCount' => $result['rowCount'],
        ], Response::HTTP_OK);
    }

    /**
     * ユーザーを作成
     *
     * @param  StoreRequest $request
     * @param  StoreUseCase $useCase
     * @return JsonResponse
     */
    public function store(StoreRequest $request, StoreUseCase $useCase): JsonResponse
    {
        $dto = StoreDTO::fromArray($request->validated());

        $user = $useCase->handle($dto);

        return ApiResponse::success([
            'user' => new UserResource($user),
        ], Response::HTTP_CREATED);
    }
}
