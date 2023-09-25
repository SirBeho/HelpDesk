<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
     
    public function index()
    {

        if (auth()->user()->rol_id == 1) {
            $users = User::select('id', 'name', 'telefono', 'email', 'status', 'rol_id')->with('rol')->get();

            $roles = Rol::select('id', 'nombre')->where('status', 1)->get();

            return Inertia::render('Usuarios/Index', [
                'users' => $users,
                'roles' => $roles
            ]);
        } else {
            return json_encode('No tienes permiso para esta transaccion');
        }
    }

    public function update(Request $request)
    {

        if (auth()->user()->rol_id == 1) {
            $user = User::find($request->id);
            $user->status = $request->status;
            $user->rol_id = $request->rol_id;
            $user->save();

            return redirect(route('usuarios.index'));
        } else {
            return json_encode('No tienes permiso para esta transaccion');
        }
    }
 
    public function destroy(string $id)
    {

        if (auth()->user()->rol_id == 1) {

            User::destroy($id);
            return redirect(route('usuarios.index'));
        } else {
            return json_encode('No tienes permiso para esta transaccion');
        }
    }
}
