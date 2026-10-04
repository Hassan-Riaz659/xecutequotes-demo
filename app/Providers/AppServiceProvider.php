<?php

namespace App\Providers;

use App\Services\Payment\CardConnectGateway;
use App\Services\Payment\DemoGateway;
use App\Services\Payment\PaymentGateway;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(PaymentGateway::class, function () {
            return config('demo.enabled') ? new DemoGateway() : new CardConnectGateway();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);

        if (config('demo.enabled')) {
            // Nothing may leave the machine in demo mode: mail goes to the log and
            // the PDF renderer is not allowed to download remote files.
            config([
                'mail.default' => 'log',
                'dompdf.defines.enable_remote' => false,
            ]);
        }
    }
}
