<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\NotificacionController;
use App\Http\Controllers\ProfileController;

use App\Http\Controllers\UserController;

use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\TipoSolicitudController; 
use App\Models\TipoSolicitud;
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

Route::get('/', [AuthenticatedSessionController::class, 'create']);

Route::middleware(['auth', 'verified'])->group(function () {

    Route::match(['get', 'post'], '/admsolicitudes', [SolicitudController::class, 'administracion'])->name('admsolicitudes');
    Route::get('/solicitudes', [SolicitudController::class, 'index'])->name('solicitudes');
    Route::get('/panel', [SolicitudController::class, 'panel'])->name('panel');
    
    Route::get('/notificaciones', [NotificacionController::class, 'index'])->name('notificaciones');
    Route::post('/notificaciones/{id}/{n_id}', [NotificacionController::class, 'update'])->name('notificaciones.update');

    Route::get('/usuarios', [UserController::class, 'index'])->name('usuarios.index');
    Route::post('/usuarios/{id}', [UserController::class, 'update'])->name('usuario.update');
    Route::post('/usuario/{id}', [UserController::class, 'destroy'])->name('usuario.delete');

    Route::get('/configuracion', [TipoSolicitudController::class, 'index'])->name('tipoSolicitud.index');
    Route::post('/configuracion/create', [TipoSolicitudController::class, 'create'])->name('tipoSolicitud.create');
    Route::post('/configuracion/{id}', [TipoSolicitudController::class, 'update'])->name('tipoSolicitud.update');
    Route::post('/configuracion/delete/{id}', [TipoSolicitudController::class, 'destroy'])->name('tipoSolicitud.delete');
    
    Route::get('/configuracion/empresa', [EmpresaController::class, 'index'])->name('empresa.index');
    Route::post('/configuracion/empresa/{id}', [EmpresaController::class, 'update'])->name('empresa.update');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/archivos', function () {
        return Inertia::render('Archivos/Index');
    })->name('archivos');

    Route::get('/form', function () {
        return Inertia::render('Form/Index');
    })->name('form');

    Route::get('/reportes', function () {
        return Inertia::render('Reportes/Index',[
            'tipo_solicitudes' => TipoSolicitud::where('status', '1')->get(),
        ]);
    })->name('reportes');

    Route::get('/reportes1', function () {
        return Inertia::render('Reportes/reporte_solicitudes');
       
    });
    Route::get('/reportes2', function () {
        return Inertia::render('Reportes/reporte_documentos');
       
    });

   
  
    Route::post('register', [RegisteredUserController::class, 'store'])->name('register');
    Route::post('upload', [FileController::class, 'upload'])->name('upload');
    Route::post('/download', [FileController::class, 'download'])->name('download');
    Route::post('/solicitudes2', [SolicitudController::class, 'create'])->name('solicitud.create');
    Route::post('/solicitudes', [SolicitudController::class, 'update'])->name('solicitud.update');
    Route::post('register', [RegisteredUserController::class, 'store'])->name('register');

    Route::post('/coment', [ComentarioController::class, 'create'])->name('comentario.create');
    Route::post('/coment4', [ComentarioController::class, 'destroy'])->name('comentario.destroy');

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
