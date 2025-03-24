<?php

namespace App\UseCases\User;

use App\Dto\User\DeleteDTO;
use App\Models\User;

final class DeleteUseCase
{
    /**
     * ユーザーを削除する
     *
     * @param  DeleteDTO $dto ユーザー削除DTO
     * @return void
     */
    public function handle(DeleteDTO $dto): void
    {
        User::whereIn('id', $dto->ids)->delete();
    }
}
