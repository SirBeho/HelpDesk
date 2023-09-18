<?php

use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/admsolicitudes', function () {
    return Inertia::render('Admsolicitudes/Index');
})->middleware(['auth', 'verified'])->name('admsolicitudes');

Route::get('/notificaciones', function () {
    return Inertia::render('Notificaciones/Index');
})->middleware(['auth', 'verified'])->name('notificaciones');

Route::get('/solicitudes', function () {
    return Inertia::render('Solicitudes/Index');
})->middleware(['auth', 'verified'])->name('solicitudes');

Route::get('/panel', function () {
    return Inertia::render('Panel/Index');
})->middleware(['auth', 'verified'])->name('panel');

Route::get('/usuarios', function () {
    return Inertia::render('Usuarios/Index');
})->middleware(['auth', 'verified'])->name('usuarios');

Route::get('/archivos', function () {
    return Inertia::render('Archivos/Index');
})->middleware(['auth', 'verified'])->name('archivos');

Route::get('/form', function () {
    return Inertia::render('Form/Index');
})->middleware(['auth', 'verified'])->name('form');

Route::get('/reportes', function () {
    return Inertia::render('Reportes/Index');
})->middleware(['auth', 'verified'])->name('reportes');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'delete'])
    ->middleware(['auth', 'verified']);

require __DIR__ . '/auth.php';
