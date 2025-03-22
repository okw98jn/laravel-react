<?php

namespace App\UseCases\User;

use App\DTO\User\IndexDTO;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

final class IndexUseCase
{
    /**
     * ユーザー一覧を取得する
     *
     * @param  IndexDTO                                           $dto ユーザー検索DTO
     * @return array{users: Collection<int, User>, rowCount: int}
     */
    public function handle(IndexDTO $dto): array
    {
        $query = User::query();

        // ID検索
        if ($dto->id !== null) {
            $query->where('id', $dto->id);
        }

        // 名前検索
        if ($dto->name !== null) {
            $query->where('name', 'like', '%' . $dto->name . '%');
        }

        // メールアドレス検索
        if ($dto->email !== null) {
            $query->where('email', 'like', '%' . $dto->email . '%');
        }

        // 総件数を取得
        $rowCount = $query->count();

        // ページネーションを適用
        $users = $query->skip($dto->pageIndex * $dto->pageSize)
            ->take($dto->pageSize)
            ->get();

        return [
            'users'    => $users,
            'rowCount' => $rowCount,
        ];
    }
}
