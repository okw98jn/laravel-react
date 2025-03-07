<?php

use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::controller(RegisteredUserController::class)->group(function () {
            Route::post('/register', 'store')->name('register');
        });

        Route::controller(AuthenticatedSessionController::class)->group(function () {
            Route::post('/login', 'store')->name('login');
        });
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::controller(AuthenticatedSessionController::class)->group(function () {
            Route::post('/logout', 'destroy')->name('logout');
        });
    });
});
