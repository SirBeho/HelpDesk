<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ProfileController;
 
use App\Http\Controllers\UserController;
 
use App\Http\Controllers\SolicitudController;
use App\Models\File;
use App\Models\Solicitud;
use App\Models\TipoSolicitud;
 
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [AuthenticatedSessionController::class, 'create']);

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::match(['get', 'post'], '/admsolicitudes', function () {
        return Inertia::render('Admsolicitudes/Index', [
            'archivos' => Auth::user()->load("files")->files,
        ]);
    })->name('admsolicitudes');

    Route::get('/notificaciones', function () {
        return Inertia::render('Notificaciones/Index');
    })->name('notificaciones');

    Route::get('/solicitudes', function () {
        $mensaje = session('msj');
        Session::forget('msj');

        return Inertia::render('Solicitudes/Index', [
            'datos' => TipoSolicitud::all(),
            'msj' => $mensaje,
        ]);
    })->name('solicitudes');

    Route::get('/panel', function () {
        return Inertia::render('Panel/Index');
    })->name('panel');


    Route::get('/usuarios', [UserController::class, 'index'])->name('usuarios.index');
    Route::post('/usuarios/{id}', [UserController::class, 'update'])->name('usuario.update');
    Route::post('/usuario/{id}', [UserController::class, 'destroy'])->name('usuario.delete');

    Route::get('/archivos', function () {
        return Inertia::render('Archivos/Index');
    })->name('archivos');

    Route::get('/form', function () {
        return Inertia::render('Form/Index');
    })->name('form');

    Route::get('/reportes', function () {
        return Inertia::render('Reportes/Index');
    })->name('reportes');
  

    Route::post('upload', [FileController::class, 'upload'])->name('upload');
    Route::post('/solicitudes', [SolicitudController::class, 'create'])->name('solicitud.create');
    Route::post('/download', [FileController::class, 'download']);
    
   Route::post('register', [RegisteredUserController::class, 'store'])->name('register');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'delete'])
    ->middleware(['auth', 'verified']);

require __DIR__ . '/auth.php';
