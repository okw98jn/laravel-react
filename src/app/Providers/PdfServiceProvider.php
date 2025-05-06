<?php

namespace App\Providers;

use App\Services\PdfService;
use Illuminate\Support\ServiceProvider;

class PdfServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind('pdf-generator', function () {
            return new PdfService();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
