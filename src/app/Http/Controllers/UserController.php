<?php

namespace App\Http\Controllers;

use App\Facades\ApiResponse;
use App\Http\Requests\User\StoreRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\UseCases\User\StoreUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * ユーザー一覧を取得
     *
     * @param  Request      $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $query = User::query();

        // ID検索
        if ($request->filled('id')) {
            $query->where('id', $request->input('id'));
        }

        // 名前検索
        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        // メールアドレス検索
        if ($request->filled('email')) {
            $query->where('email', 'like', '%' . $request->input('email') . '%');
        }

        // ページネーションの設定
        $pageSize  = $request->input('pageSize', 10);
        $pageIndex = $request->input('pageIndex', 0);

        // 総件数を取得
        $rowCount = $query->count();

        // ページネーションを適用
        $users = $query->skip($pageIndex * $pageSize)
            ->take($pageSize)
            ->get();

        return ApiResponse::success([
            'users'    => UserResource::collection($users),
            'rowCount' => $rowCount,
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
        $request->validated();

        $user = $useCase->handle($request);

        return ApiResponse::success([
            'user' => new UserResource($user),
        ], Response::HTTP_CREATED);
    }
}
