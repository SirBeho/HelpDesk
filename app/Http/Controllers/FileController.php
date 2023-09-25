<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Crypt;


use function Ramsey\Uuid\v1;

class FileController extends Controller
{
    public function showFiles()
    {
        $uploadedFiles = Storage::disk('uploads')->files();
        return view('upload', compact('uploadedFiles'));
    }

    public function form(Request $request)
    {
        if ($request->hasFile('file')) {
            return Inertia::render('Auth/ResetPassword', [
                'file' => $request->file('file'),
            ]);
        } else {
            return response()->json(['message' => 'No se ha seleccionado ningún archivo'], 400);
        }
    }


    public function upload(Request $request)
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            $encryptedData = Crypt::encrypt(file_get_contents($file->getPathname()));
            $fileName = time() . ".pdf";

            Storage::disk('uploads')->put($fileName, $encryptedData);

            return response()->json(['message' => 'Archivo subido con éxito'], 200);
        } else {
            return response()->json(['message' => 'No se ha seleccionado ningún archivo'], 400);
        }
    }

    
    public function download($fileName)
    {
        $encryptedData = Storage::disk('uploads')->get($fileName);
        $decryptedData = Crypt::decrypt($encryptedData);

        return response($decryptedData, 200)
            ->header('Content-Type', 'application/octet-stream')
            ->header('Content-Disposition', 'attachment; filename="' . $fileName . '"');
    }

    public function uploadFile(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpg,png,pdf|max:2048',
        ], [
            'file.required' => 'El archivo es obligatorio.',
            'file.file' => 'El archivo debe ser un archivo válido.',
            'file.mimes' => 'El archivo debe ser una imagen (jpg, png) o un archivo PDF.',
            'file.max' => 'El archivo no debe ser mayor de 2MB.',
        ]);

        if ($request->file('file')->isValid()) {
            $file = $request->file('file');
            $fileName = time() . '.' . $file->getClientOriginalExtension();


            Storage::disk('uploads')->put($fileName, file_get_contents($file));

            return redirect()->route('showUploadForm')->with('success', 'El archivo se ha cargado correctamente.');
        } else {
            return redirect()->route('showUploadForm')->with('error', 'Hubo un error al cargar el archivo.');
        }
    }
}
