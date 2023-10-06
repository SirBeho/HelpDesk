<?php

namespace App\Http\Controllers;

use App\Models\Solicitud;
use App\Models\TipoSolicitud;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class SolicitudController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return Solicitud::with('user', 'tipo' , 'status')->get();
    }

    
    public function show($id)
    {

        $validator = validator(['id' => $id], [
            'id' => 'required|numeric'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $Solicitud = Solicitud::findOrFail($id);
            $Solicitud->load('user');
            $Solicitud->load('tipo');
            $Solicitud->load('status');

            return $Solicitud;
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'La Solicitud ' . $id . ' no existe no fue encontrada'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en la acción realizada'], 500);
        }

    }

    public function create(Request $request)
    {


      
        try {
            
                   
            $request->merge([
                'user_id' => Auth::user()->id,
                'status_id' => 1,
            ]);


            $validator = validator($request->all(), [
                // 'numero'=> 'required',
                'tipo_id'=> 'exists:tipo_Solicitudes,id',
                // 'empresa'=> 'required',
                'created_at' => 'date',
                'user_id'=> 'exists:users,id',
                'status_id'=> 'exists:estado_Solicitudes,id',
                'comentario'=> 'required',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
    
            $Solicitud = Solicitud::create($request->all());

            $request->merge([
                'solicitud_id' =>  $Solicitud->id,
            ]);
                      

            $log = new LogSolicitudController();
            $respuesta = $log->create($request); 
        
            session()->put('msj', ["success" => $respuesta->original['msj']]);
            
            if(isset($request->created_at)){
                return redirect('panel');     
            }
                
           

            //  return response()->json(['msj' => 'Solicitud creada correctamente','log' => $respuesta->original['msj']], 200);
        
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'No se pudo registrar el Solicitud'.$e->getMessage()], 404);
        }catch (QueryException $e) {
           
            $errormsj = $e->getMessage();
            

            if (strpos($errormsj, 'Duplicate entry') !== false) {
                preg_match("/Duplicate entry '(.*?)' for key '(.*?)'/", $errormsj, $matches);
                $duplicateValue = $matches[1] ?? '';
                $duplicateKey = $matches[2] ?? '';
                if ($duplicateKey == 'solicitudes_tipo_id_user_id_created_at_unique') {
                    $fecha = Carbon::parse(substr($duplicateValue, 4))->locale('es');
                    session()->put('msj', ["errord" => "Ya existe un bloque para " . $duplicateValue]);
                }

                preg_match("/Duplicate entry '(.*?)' for key '(.*?)'/", $errormsj, $matches);
                $duplicateValue = $matches[1] ?? '';
                $duplicateKey = $matches[2] ?? '';

                return redirect('panel');
        
                // return response()->json(['error' => "No se puede realizar la acción, el valor '$duplicateValue' ya está duplicado en el campo '$duplicateKey'"], 422);
            }

            // return response()->json(['error' => 'Error en la acción realizada: ' . $errormsj], 500);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error en la accion realizada' . $e->getMessage()], 500);
        }
        return redirect('solicitudes');
    }

    public function update($id,Request $request)
    {
        
        try {

            $validator = validator($request->all(), [
                'numero'=> 'required',
                'tipo_id'=> 'exists:tipo_Solicitudes,id',
                'empresa'=> 'required',
                'rnc' => 'required',
                'user_id'=> 'exists:users,id',
                'status_id'=> 'exists:estado_Solicitudes,id',
                'comentario'=> 'required',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $Solicitud = Solicitud::findOrFail($id);

            $request->merge([
                'solicitud_id' => $id,
                'status_ant' => $Solicitud->status_id,
            ]);
     
            $Solicitud->update($request->all());
            $Solicitud->save();
            
            if ($request->status_ant != $request->status_id) {

                $log = new LogSolicitudController();
                $respuesta = $log->create($request);
                return response()->json(['msj' => 'Solicitud actualizada correctamente', 'log' => $respuesta->original['msj']], 200);
            }
            
            return response()->json(['msj' => 'Solicitud actualizada correctamente'], 200);
        
           
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El Solicitud ' . $id . ' no existe no fue encontrado'], 404);
        }catch (Exception $e) {
           
            return response()->json(['error' => 'Error en la acción realizada'], 500);
        }
    }

    public function destroy($id)
    {
        $validator = validator(['id' => $id], [
            'id' => 'required|numeric'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $Solicitud = Solicitud::findOrFail($id);
            if ($Solicitud->status) {
                $Solicitud->status = 0;
                $Solicitud->save();
                return response()->json(['msj' => 'Solicitud eliminado correctamente'], 200);
            }
            return response()->json(['msj' => 'Este Solicitud ya ha sido eliminado'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El Solicitud ' . $id . ' no existe no fue encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en la acción realizada'], 500);
        }
    }
}
