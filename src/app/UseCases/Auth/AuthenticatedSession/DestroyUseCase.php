<?php

namespace App\UseCases\Auth\AuthenticatedSession;

use Illuminate\Support\Facades\Auth;

final class DestroyUseCase
{
    /**
     * ログアウト
     *
     * @return void
     */
    public function handle(): void
    {
        Auth::guard('web')->logout();
    }
}
