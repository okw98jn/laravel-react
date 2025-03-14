<?php

use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\Auth\AuthUserController;
use App\Http\Controllers\Admin\Auth\RegisteredUserController;
use App\Http\Middleware\GuestApi;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('web')->group(function () {
        Route::middleware(GuestApi::class)->group(function () {
            Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');
            Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login');
        });

        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum')->name('logout');
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth-user', [AuthUserController::class, 'show'])->name('auth-user.show');
    });
});
