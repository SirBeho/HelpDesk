<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SolicitudController;
use App\Models\Solicitud;
use App\Models\TipoSolicitud;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
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

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::post('upload', [FileController::class, 'form'])->name('upload');
Route::get('download/{fileName}', [FileController::class, 'download'])->name('download');


Route::middleware(['auth', 'verified'])->group(function () {

    Route::match(['get', 'post'], 'upload', function (Request $request) {
            if ($request->hasFile('file')) {
                return Inertia::render('Subir/Index', [
                    'file' => $request->file('file'),
                ]);
            } else {
                return Inertia::render('Subir/Index', [
                    'file' => null, 
                ]);
            }
    })->name('upload');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/admsolicitudes', function () {
        return Inertia::render('Admsolicitudes/Index',[
            'datos' => Solicitud::with('user', 'tipo','status')->get(),
          
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

    Route::get('/usuarios', function () {
        return Inertia::render('Usuarios/Index');
    })->name('usuarios');

    Route::get('/archivos', function () {
        return Inertia::render('Archivos/Index');
    })->name('archivos');

    Route::get('/form', function () {
        return Inertia::render('Form/Index');
    })->name('form');

    Route::get('/reportes', function () {
        return Inertia::render('Reportes/Index');
    })->name('reportes');

    
    Route::post('/solicitudes', [SolicitudController::class, 'create'])->name('solicitud.create');
   
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
