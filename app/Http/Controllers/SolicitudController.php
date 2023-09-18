<?php

namespace App\Http\Controllers;

use App\Models\Solicitud;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

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
    
           
            $Solicitud = Solicitud::create($request->all());

            $request->merge([
                'solicitud_id' =>  $Solicitud->id,
            ]);
                      

            $log = new LogSolicitudController();
            $respuesta = $log->create($request);
            return response()->json(['msj' => 'Solicitud creada correctamente','log' => $respuesta->original['msj']], 200);
        
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'No se pudo registrar el Solicitud'.$e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error en la accion realizada' . $e->getMessage()], 500);
        }
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
        } catch (Exception $e) {
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
