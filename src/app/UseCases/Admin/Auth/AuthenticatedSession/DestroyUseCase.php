<?php

namespace App\UseCases\Admin\Auth\AuthenticatedSession;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

final class DestroyUseCase
{
    /**
     * ログアウト
     *
     * @param  Request $request
     * @return void
     */
    public function handle(Request $request): void
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
