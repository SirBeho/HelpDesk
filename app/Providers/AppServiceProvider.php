<?php

namespace App\Providers;

use App\Models\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Validator::extend('unique_name', function ($attribute, $value, $parameters, $validator) {
            $nombres = $validator->getData()['nombre'];
            $count = array_count_values($nombres)[$value] ?? 0;
            
        if ($count > 1) {
            return false; 
        }
        
            return !File::where('nombre', $value)->exists();
        });
    }
}
