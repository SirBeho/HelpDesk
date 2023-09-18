<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function showFiles()
        {
    
            $uploadedFiles = Storage::disk('uploads')->files();

         return view('upload', compact('uploadedFiles'));
        }

   

    public function upload(Request $request)
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            $fileName = time();
            $file->storeAs('uploads', $fileName);

            return response()->json(['message' => 'Archivo subido con éxito']);
        } else {
            return response()->json(['message' => 'No se ha seleccionado ningún archivo'], 400);
        }
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(File $file)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, File $file)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file)
    {
        //
    }
}
