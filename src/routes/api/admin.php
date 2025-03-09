<?php

use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\Auth\RegisteredUserController;
use App\Http\Middleware\GuestApi;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('web')->group(function () {
        Route::controller(AuthenticatedSessionController::class)->group(function () {
            Route::post('/login', 'store')->middleware(GuestApi::class)->name('login');
            Route::post('/logout', 'destroy')->middleware('auth:sanctum')->name('logout');
        });
    });

    Route::middleware(GuestApi::class)->group(function () {
        Route::controller(RegisteredUserController::class)->group(function () {
            Route::post('/register', 'store')->name('register');
        });
    });

    Route::middleware('auth:sanctum')->group(function () {
    });
});
