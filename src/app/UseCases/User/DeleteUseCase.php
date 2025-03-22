<?php

namespace App\UseCases\User;

use App\DTO\User\DeleteDTO;
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
        $user = User::findOrFail($dto->id);

        $user->delete();
    }
}
