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
   
    public function upload(Request $request) {
        $mensajes = [
            'file.required' => 'No se ha seleccionado ningun archivo.',
            'file.file' => 'El archivo debe ser un archivo válido.',
            'file.mimes' => 'El archivo debe ser una imagen o un archivo PDF, Word o Exel.',
            'file.max' => 'El archivo no debe ser mayor de 2MB.',
            'solicitud_id.exists' => 'La solicitud no existe.',
            // 'nombre.*.unique_name' => 'El nombre esta duplicado.',
        ];
    
        $validator = validator($request->all(), [
            'files.*' => 'required|file|mimes:jpeg,jpg,png,docx,xlsx|max:2048',
            'nombre.*' => 'required|unique_name',
            'solicitud_id' => 'required|exists:solicitudes,id',
        ], $mensajes);

      
        if ($validator->fails()) {
            $formattedErrors = ["duplicados" => [], "error" => []];
        
            foreach ($validator->errors()->messages() as $key => $value) {
                if ($value[0] == "validation.unique_name") {
                    $index = substr($key, 7);
                    $nombre = $request->nombre[$index];
                    $formattedErrors["duplicados"][] =  $nombre;
                } else {
                    $formattedErrors["error"][] =  $value[0];
                }
            }
        
            session()->put('msj', ['error' => $formattedErrors], 200);
        
            if (Solicitud::findOrFail($request->solicitud_id)->tipo_id < 3) {
                return redirect('panel');
            }
        
            return redirect('admsolicitudes');
        }
        
    
        $mensajesExitosos = [];
        $mensajesErrores = null;
    
        try {
            $solicitud_numero = Solicitud::findOrFail($request->solicitud_id)->numero;
    
            foreach ($request->file('file') as $index => $file) {
                 
                 try {
                    $extension = $file->getClientOriginalExtension();
                    $encryptedData = Crypt::encrypt(file_get_contents($file->getPathname()));
    
                    $referencia = time() . "_" .$index. $solicitud_numero;
                    $name = $referencia . "." . $extension;
    
                    $data = [
                        'nombre' => $request->nombre[$index],
                        'solicitud_id' => $request->solicitud_id,
                        'referencia' => $referencia,
                        'extencion' => $extension,
                        'user_id' => Auth::user()->id,
                    ];
    
                    File::create($data);
    
                    Storage::disk('uploads')->put($name, $encryptedData);
    
                    $mensajesExitosos[] = "Archivo ".$request->nombre[$index]." subido con éxito.";
                }catch (QueryException $e) {
                    $errormsj = $e->getMessage();
                
                    if (strpos($errormsj, 'Duplicate entry') !== false) {
                        preg_match("/Duplicate entry '(.*?)' for key '(.*?)'/", $errormsj, $matches);
                        $duplicateValue = $matches[1] ?? '';
                        $duplicateKey = $matches[2] ?? '';
                

                        $mensajesErrores[] = "Error al subir el archivo $duplicateValue: nombre duplicado";

                        // return response()->json(['error' => "No se puede realizar la acción, el valor '$duplicateValue' está duplicado "], 422);
                    }else{

                        $mensajesErrores[] = "Error al subir el archivo:";
                    }

                } catch (\Exception $e) {
                    $mensajesErrores[] = "Error desconocido al subir el archivo :" . $e->getMessage();
                } 
            }
            if($mensajesErrores == null){
                $mensajesExitosos = ["Todos los archivos subidos con exito"];
            }
            
            session()->put('msj' , ['success' => $mensajesExitosos, 'error' => $mensajesErrores], 200);
            

           
            if(Solicitud::findOrFail($request->solicitud_id)->tipo_id < 3){
                return redirect('panel');     
            }
             return redirect('admsolicitudes');     
            
       
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

                $encryptedData = Storage::disk('uploads')->get($name);
                $file = Crypt::decrypt($encryptedData);

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
