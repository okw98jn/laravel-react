<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\AuthenticatedSession\StoreRequest;
use App\Http\Resources\Auth\AuthResource;
use App\UseCases\Admin\Auth\AuthenticatedSession\StoreUseCase;

class AuthenticatedSessionController extends Controller
{
    /**
     * ログイン
     *
     * @param  StoreRequest $request
     * @param  StoreUseCase $useCase
     * @return AuthResource
     */
    public function store(StoreRequest $request, StoreUseCase $useCase): AuthResource
    {
        /** @var array{email: string, password: string} $credentials */
        $credentials = $request->validated();

        return new AuthResource($useCase->handle($credentials));
    }
}
