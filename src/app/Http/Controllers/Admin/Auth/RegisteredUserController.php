<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\RegisteredUser\StoreRequest;
use App\Http\Resources\Auth\AuthResource;
use App\UseCases\Admin\Auth\RegisteredUser\StoreUseCase;

class RegisteredUserController extends Controller
{
    /**
     * ユーザー登録
     *
     * @param  StoreRequest $request
     * @param  StoreUseCase $useCase
     * @return AuthResource
     */
    public function store(StoreRequest $request, StoreUseCase $useCase): AuthResource
    {
        /** @var array{name: string, email: string, password: string} $validated */
        $validated = $request->validated();

        $user = $useCase->handle($validated['name'], $validated['email'], $validated['password']);

        return new AuthResource($user);
    }
}
