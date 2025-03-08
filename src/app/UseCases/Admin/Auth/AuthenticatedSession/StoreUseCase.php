<?php

namespace App\UseCases\Admin\Auth\AuthenticatedSession;

use App\Http\Requests\Admin\Auth\AuthenticatedSession\StoreRequest;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;

final class StoreUseCase
{
    /**
     * ユーザーをログインさせる
     *
     * @param  StoreRequest                           $request
     * @param  array{email: string, password: string} $credentials
     * @return User
     * @throws AuthenticationException
     */
    public function handle(StoreRequest $request, array $credentials): User
    {
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            /** @var User $user */
            $user = Auth::user();
            return $user;
        }

        throw new AuthenticationException();
    }
}
