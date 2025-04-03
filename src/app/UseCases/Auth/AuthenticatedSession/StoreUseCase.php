<?php

namespace App\UseCases\Auth\AuthenticatedSession;

use App\Dto\Auth\AuthenticatedSession\StoreDto;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;

final class StoreUseCase
{
    /**
     * ユーザーをログインさせる
     *
     * @param  StoreDto                $dto
     * @return User
     * @throws AuthenticationException
     */
    public function handle(StoreDto $dto): User
    {
        $credentials = [
            'email'    => $dto->email,
            'password' => $dto->password,
        ];

        if (Auth::attempt($credentials)) {
            /** @var User $user */
            $user = Auth::user();

            return $user;
        }

        throw new AuthenticationException();
    }
}
