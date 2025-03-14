<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

final class ApiResponse extends Facade
{
    /**
     * ApiResponseService
     *
     * @return string
     */
    protected static function getFacadeAccessor(): string
    {
        return 'ApiResponse';
    }
}
