<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

final class Csv extends Facade
{
    /**
     * CsvService
     *
     * @return string
     */
    protected static function getFacadeAccessor(): string
    {
        return 'Csv';
    }
}
