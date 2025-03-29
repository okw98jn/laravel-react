<?php

namespace App\UseCases\Auth\RegisteredUser;

use App\Dto\Auth\RegisteredUser\StoreDto;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

final class StoreUseCase
{
    /**
     * ユーザーを登録してログイン状態にする
     *
     * @param  StoreDto $dto
     * @return User
     */
    public function handle(StoreDto $dto): User
    {
        $user = User::create([
            'name'     => $dto->name,
            'email'    => $dto->email,
            'password' => Hash::make($dto->password),
        ]);

        Auth::login($user);

        return $user;
    }
}
