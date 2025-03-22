<?php

namespace App\UseCases\Auth\AuthenticatedSession;

use App\DTO\Auth\AuthenticatedSession\StoreDTO;
use App\Http\Requests\Auth\AuthenticatedSession\StoreRequest;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;

final class StoreUseCase
{
    /**
     * ユーザーをログインさせる
     *
     * @param  StoreRequest            $request
     * @param  StoreDTO                $dto
     * @return User
     * @throws AuthenticationException
     */
    public function handle(StoreRequest $request, StoreDTO $dto): User
    {
        $credentials = [
            'email'    => $dto->email,
            'password' => $dto->password,
        ];

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            /** @var User $user */
            $user = Auth::user();

            return $user;
        }

        throw new AuthenticationException();
    }
}
