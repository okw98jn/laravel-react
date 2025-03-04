<?php

namespace App\UseCases\Api\Admin\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

final class RegisterUseCase
{
    /**
     * ユーザーを登録する
     *
     * @param  array{name: string, email: string, password: string} $data
     * @return User
     */
    final public function handle(array $data): User
    {
        return User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
