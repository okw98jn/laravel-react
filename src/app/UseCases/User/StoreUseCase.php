<?php

namespace App\UseCases\User;

use App\DTO\User\StoreDTO;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

final class StoreUseCase
{
    /**
     * ユーザーを登録する
     *
     * @param  StoreDTO $dto ユーザー作成DTO
     * @return User
     */
    public function handle(StoreDTO $dto): User
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
