<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\AdminController;
use App\Http\Controllers\Api\Admin\CategoryController;
use App\Http\Controllers\Api\Admin\Auth\LoginController;
use App\Http\Controllers\Api\Admin\Auth\LogoutController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('admin')->name('admin.')->group(function () {
    Route::post('login', [LoginController::class, 'login'])->name('login');
    Route::post('logout', [logoutController::class, 'logout'])->name('login');
    Route::get('/', [AdminController::class, 'fetchAuthAdmin']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('admin')->name('admin.')->group(function () {
            Route::get('admins', [AdminController::class, 'getAllAdmins'])->name('admins');
            Route::get('search', [AdminController::class, 'search'])->name('search');
            Route::post('admin', [AdminController::class, 'storeAdmin'])->name('admin');
            Route::get('{id}', [AdminController::class, 'showAdmin'])->name('show_admin');
            Route::post('update/{id}', [AdminController::class, 'updateAdmin'])->name('update_admin');
            Route::post('login_id_duplicate_check', [AdminController::class, 'loginIdDuplicateCheck'])->name('login_id_duplicate_check');
            Route::post('password_check', [AdminController::class, 'passwordCheck'])->name('password_check');
            Route::post('delete', [AdminController::class, 'delete'])->name('delete');
        });

        Route::prefix('category')->name('category.')->group(function () {
            Route::get('categories', [CategoryController::class, 'getAllCategories'])->name('categories');
            Route::get('search', [CategoryController::class, 'search'])->name('search');
            Route::post('category', [CategoryController::class, 'storeCategory'])->name('category');
            Route::get('{id}', [CategoryController::class, 'showCategory'])->name('show_category');
            Route::post('update/{id}', [CategoryController::class, 'updateCategory'])->name('update_category');
            Route::post('category_name_duplicate_check', [CategoryController::class, 'categoryNameDuplicateCheck'])->name('category_name_duplicate_check');
            Route::post('delete', [CategoryController::class, 'delete'])->name('delete');
        });
    });
});
