<?php

namespace App\Http\Controllers;

use App\DTO\User\DeleteDTO;
use App\DTO\User\IndexDTO;
use App\DTO\User\StoreDTO;
use App\DTO\User\UpdateDTO;
use App\Facades\ApiResponse;
use App\Http\Requests\User\DeleteRequest;
use App\Http\Requests\User\IndexRequest;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Resources\UserResource;
use App\UseCases\User\DeleteUseCase;
use App\UseCases\User\IndexUseCase;
use App\UseCases\User\StoreUseCase;
use App\UseCases\User\UpdateUseCase;
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

    /**
     * ユーザーを更新
     *
     * @param  UpdateRequest $request
     * @param  UpdateUseCase $useCase
     * @return JsonResponse
     */
    public function update(UpdateRequest $request, UpdateUseCase $useCase): JsonResponse
    {
        $dto = UpdateDTO::fromArray($request->validated());

        $user = $useCase->handle($dto);

        return ApiResponse::success([
            'user' => new UserResource($user),
        ], Response::HTTP_OK);
    }

    /**
     * ユーザーを削除
     *
     * @param  DeleteRequest $request
     * @param  DeleteUseCase $useCase
     * @return JsonResponse
     */
    public function delete(DeleteRequest $request, DeleteUseCase $useCase): JsonResponse
    {
        $dto = DeleteDTO::fromArray($request->validated());

        $useCase->handle($dto);

        return ApiResponse::success([], Response::HTTP_NO_CONTENT);
    }
}
