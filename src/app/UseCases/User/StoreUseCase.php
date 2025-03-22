<?php

namespace App\UseCases\User;

use App\Models\User;

final class StoreUseCase
{
    /**
     * ユーザーを登録する
     *
     * @return User
     */
    public function handle(): User
    {
        $user = User::create([
        ]);

        return $user;
    }
}
