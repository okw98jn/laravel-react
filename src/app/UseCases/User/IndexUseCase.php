<?php

namespace App\UseCases\User;

use App\Dto\User\IndexDTO;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

final class IndexUseCase
{
    /**
     * ユーザー一覧を取得する
     *
     * @param  IndexDTO                   $dto ユーザー検索DTO
     * @return LengthAwarePaginator<User>
     */
    public function handle(IndexDTO $dto): LengthAwarePaginator
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

        return $query->paginate($dto->page_size);
    }
}
