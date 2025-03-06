<?php

namespace App\UseCases\Api\Admin\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

final class LoginUseCase
{
    /**
     * ユーザーをログインさせる
     *
     * @param  array{email: string, password: string} $credentials
     * @return User
     * @throws ValidationException
     */
    public function handle(array $credentials): User
    {
        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['メールアドレスまたはパスワードが正しくありません。'],
            ]);
        }

        /** @var User $user */
        $user = Auth::user();
        return $user;
    }
}
