<?php

namespace App\UseCases\User;

use App\Dto\User\IndexDto;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

final class IndexUseCase
{
    /**
     * ユーザー一覧を取得する
     *
     * @param  IndexDto                   $dto ユーザー検索Dto
     * @return LengthAwarePaginator<User>
     */
    public function handle(IndexDto $dto): LengthAwarePaginator
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

        // 並び順
        $query->orderBy($dto->sort_column, $dto->sort_direction);

        return $query->paginate($dto->page_size, ['*'], 'page', $dto->page);
    }
}
