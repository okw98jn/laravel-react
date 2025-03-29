<?php

namespace App\UseCases\User;

use App\Dto\User\StoreDto;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

final class StoreUseCase
{
    /**
     * ユーザーを登録する
     *
     * @param  StoreDto $dto ユーザー作成Dto
     * @return User
     */
    public function handle(StoreDto $dto): User
    {
        $user = User::create([
            'name'     => $dto->name,
            'email'    => $dto->email,
            'gender'   => $dto->gender,
            'status'   => $dto->status,
            'memo'     => $dto->memo,
            'password' => Hash::make($dto->password),
        ]);

        return $user;
    }
}
