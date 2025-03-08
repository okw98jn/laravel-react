<?php

namespace App\UseCases\Admin\Auth\RegisteredUser;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

final class StoreUseCase
{
    /**
     * ユーザーを登録する
     *
     * @param  string $name
     * @param  string $email
     * @param  string $password
     * @return User
     */
    public function handle(string $name, string $email, string $password): User
    {
        $user = User::create([
            'name'     => $name,
            'email'    => $email,
            'password' => Hash::make($password),
        ]);

        return $user;
    }
}
