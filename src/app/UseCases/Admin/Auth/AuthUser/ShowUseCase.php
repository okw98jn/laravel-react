<?php

namespace App\UseCases\Admin\Auth\AuthUser;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;

final class ShowUseCase
{
    /**
     * ログインユーザーを取得
     *
     * @return User
     * @throws AuthenticationException
     */
    public function handle(): User
    {
        $user = Auth::user();

        if (blank($user)) {
            throw new AuthenticationException();
        }

        return $user;
    }
}
