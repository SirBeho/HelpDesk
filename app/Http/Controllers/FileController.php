<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Solicitud;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Crypt;
use function Ramsey\Uuid\v1;
use Illuminate\Support\Facades\Log;


class FileController extends Controller
{
   
    public function upload(Request $request){

        $mensajes = [
            'file.required' => 'No se ha seleccionado ningun archivo.',
            'file.file' => 'El archivo debe ser un archivo válido.',
            'file.mimes' => 'El archivo debe ser una imagen o un archivo PDF, Word o Exel.',
            'file.max' => 'El archivo no debe ser mayor de 2MB.',
        ];

        $validator = validator($request->all(), [
            // 'file' => 'required|file|mimes:jpeg,jpg,png,pdf,docx,xlsx|max:2048',
            'file' => 'required|max:2048',
            'nombre' => 'required',
            'solicitud_id' => 'required|exists:solicitudes,id',
        ], $mensajes);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        try{
        $file = $request->file('file');

        $filename = '_' . $file->getClientOriginalName();
        $file->storeAs('uploads', $filename);
        

        return response()->json(['message' => 'Archivo subido con éxito']);
            /* 
        $extension = $file->getClientOriginalExtension();
        $solicitud_numero = Solicitud::findOrFail($request->solicitud_id)->numero;
        $encryptedData = Crypt::encrypt(file_get_contents($file->getPathname()));

        $request->merge([
            'referencia' => time() . "_" . $solicitud_numero,
            'extencion' => $extension,
            'user_id' => Auth::user()->id,
        ]);
       
        File::create($request->all());
        $name = $request->referencia.".".$extension;
        Storage::disk('uploads')->put($name , file_get_contents($file->getPathname()));
        

        return response()->json(['message' => 'Archivo subido con exito'], 200); */
        
        }catch (QueryException $e) {
            $errormsj = $e->getMessage();
        
            if (strpos($errormsj, 'Duplicate entry') !== false) {
                preg_match("/Duplicate entry '(.*?)' for key '(.*?)'/", $errormsj, $matches);
                $duplicateValue = $matches[1] ?? '';
                $duplicateKey = $matches[2] ?? '';
        
                return response()->json(['error' => "No se puede realizar la acción, el valor '$duplicateValue' está duplicado "], 422);
            }
            return response()->json(['error' => 'Error en la acción realizada: ' . $errormsj], 500);
        } catch (\Exception $e) {
                return response()->json(['error' => 'Error en la acción realizada'.$e], 500);
            }
    }

    public function download(Request $request)
    {
        
        try {
           
            $data = File::where('id', $request->id)->where('user_id', Auth::user()->id)->firstOrFail();
            $name = $data->referencia.'.'.$data->extencion;

            if (Storage::disk('uploads')->exists($name)) {
                $file = Storage::disk('uploads')->get($name);
                $mimeType = Storage::disk('uploads')->mimeType($name);
               //Log::info('MIME Type del archivo: ' . $mimeType);

                return response($file, 200)
                    ->header('Content-Type', $mimeType)
                    ->header('Content-Disposition', 'attachment; filename="' . $name . '"');
            } else {
                //Log::error('Archivo no encontrado en el sistema de archivos');
                return response()->json(['error' => 'Archivo no encontrado'], 404);
            }
        } catch (ModelNotFoundException $e) {
            //Log::error('Archivo no encontrado en la base de datos');
            return response()->json(['error' => 'Archivo no encontrado en la base de datos'], 404);
        } catch (\Exception $e) {
            //Log::error('Error interno del servidor: ' . $e->getMessage());
            return response()->json(['error' => 'Error interno del servidor'], 500);
        }
    }
    
}
