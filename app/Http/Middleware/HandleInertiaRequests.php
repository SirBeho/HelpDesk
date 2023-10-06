<?php

namespace App\Http\Middleware;

use App\Models\Notificacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
     
        return [
            ...parent::share($request),

            'auth' => [
                'user' => auth()->check() ? auth()->user()->load('solicitudes.tipo', 'solicitudes.status', 'solicitudes.user') : null,
               'countNotificaciones' => auth()->check() ?  Notificacion::where('receptor_id', Auth::user()->id)->where('status', 0)->count() : null,
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
