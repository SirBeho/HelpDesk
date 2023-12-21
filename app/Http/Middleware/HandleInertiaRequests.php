<?php

namespace App\Http\Middleware;

use App\Http\Controllers\NotificacionController;
use App\Models\Notificacion;
use App\Models\task;
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

        $user = null;

        $authUser = auth()->user();

        if ($authUser) {
            if ($authUser->rol_id == 2) {
                $user = $authUser->load(
                    'taskes.tipo',
                    'taskes.status',
                    'taskes.user',
                    'taskes.files.user',
                    'taskes.comentarios',
                    'taskes.userAsignado'
                );
            } else {
                $user = auth()->user();
                $user['taskes'] = task::all()->load('tipo', 'status', 'user', 'files.user', 'comentarios', 'userAsignado');
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
             
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
