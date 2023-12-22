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
        $this -> app -> bind('path.public', function()
            {
                return base_path('public_html');
            });
        }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        


        Validator::extend('unique_name', function ($attribute, $value, $parameters, $validator) {
            $names = $validator->getData()['name'];
            $count = array_count_values($names)[$value] ?? 0;
            
        if ($count > 1) {
            return false; 
        }
        
            return !File::where('name', $value)->where('user_id', auth()->user()->id)->exists();
        });
    }
}
