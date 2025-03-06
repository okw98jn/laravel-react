<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\LoginRequest;
use App\Http\Requests\Admin\Auth\RegisterRequest;
use App\Http\Resources\Auth\AuthResource;
use App\UseCases\Admin\Auth\LoginUseCase;
use App\UseCases\Admin\Auth\RegisterUseCase;

class AuthController extends Controller
{
    /**
     * ユーザー登録
     *
     * @param  RegisterRequest $request
     * @param  RegisterUseCase $useCase
     * @return AuthResource
     */
    public function register(RegisterRequest $request, RegisterUseCase $useCase): AuthResource
    {
        /** @var array{name: string, email: string, password: string} $validated */
        $validated = $request->validated();

        return new AuthResource($useCase->handle($validated));
    }

    /**
     * ログイン
     *
     * @param  LoginRequest $request
     * @param  LoginUseCase $useCase
     * @return AuthResource
     */
    public function login(LoginRequest $request, LoginUseCase $useCase): AuthResource
    {
        /** @var array{email: string, password: string} $credentials */
        $credentials = $request->validated();

        return new AuthResource($useCase->handle($credentials));
    }
}
