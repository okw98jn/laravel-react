<?php

namespace App\UseCases\User;

use App\Dto\User\DeleteDto;
use App\Models\User;

final class DeleteUseCase
{
    /**
     * ユーザーを削除する
     *
     * @param  DeleteDto $dto ユーザー削除Dto
     * @return void
     */
    public function handle(DeleteDto $dto): void
    {
        User::whereIn('id', $dto->ids)->delete();
    }
}
