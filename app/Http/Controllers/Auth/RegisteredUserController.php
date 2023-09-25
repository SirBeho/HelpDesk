<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Models\Rol;
use App\Models\User;
use App\Notifications\UserCreatedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {



        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
        ]);

        $password = Str::random(12);


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($password),
            'telefono' => $request->telefono,
            'rol_id' => $request->rol_id
        ]);

        // // Envía la notificación por correo electrónico
        $user->notify(new UserCreatedNotification($password));


        $users = User::select('id', 'name', 'telefono', 'email', 'status', 'rol_id')->with('rol')->get();

        $roles = Rol::select('id', 'nombre')->where('status', 1)->get();

        return Inertia::render('Usuarios/Index', [
            'users' => $users,
            'roles' => $roles
        ]);
    }
}
