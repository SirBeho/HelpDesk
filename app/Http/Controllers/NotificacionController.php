<?php

namespace App\Http\Controllers;

use App\Models\Notificacion;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class NotificacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return Notificacion::with('emisor', 'receptor')->get();

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
            $Notificacion = Notificacion::findOrFail($id);
            $Notificacion->load('emisor');
            $Notificacion->load('receptor');

            return $Notificacion;
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El Notificacion ' . $id . ' no existe no fue encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en la acción realizada'], 500);
        }

    }

    public function create(Request $request)
    {               
        try {

            $validator = validator($request->all(), [
                'emisor_id'=> 'required|exists:users,id',
                'receptor_id'=> 'required|exists:users,id',
                'message '=> 'required',
                'read '=> 'required|boolean'
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            Notificacion::create($request->all());
           
          
            return response()->json(['msj' =>  $request->description], 200);
        
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'No se pudo registrar el Notificacion'.$e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error en la accion realizada' . $e->getMessage()], 500);
        }
    }

    public function update($id,Request $request)
    {
        
        try {
            $validator = validator($request->all(), [
                'emisor_id'=> 'required|exists:users,id',
                'receptor_id'=> 'required|exists:users,id',
                'message '=> 'required',
                'read '=> 'required|boolean'
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $Notificacion = Notificacion::findOrFail($id);
            $Notificacion->update($request->all());
            $Notificacion->save();

           

            return response()->json(['msj' => 'Notificacion actualizado correctamente'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El Notificacion ' . $id . ' no existe no fue encontrado'], 404);
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
            $Notificacion = Notificacion::findOrFail($id);
            if ($Notificacion->status) {
                $Notificacion->status = 0;
                $Notificacion->save();
                return response()->json(['msj' => 'Notificacion eliminado correctamente'], 200);
            }
            return response()->json(['msj' => 'Este Notificacion ya ha sido eliminado'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El Notificacion ' . $id . ' no existe no fue encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en la acción realizada'], 500);
        }
    }

    public function read(Request $request)
    {

        $validator = validator($request->all(), [
            'id' => 'required|numeric',
            'read '=> 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
  

        try {
            $Notificacion = Notificacion::findOrFail($request->id);
          
                $Notificacion->read = $request->read;
                $Notificacion->save();
                return response()->json(['msj' => 'Notificacion eliminado correctamente'], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El Notificacion ' . $request->id . ' no existe no fue encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en la acción realizada'], 500);
        }
    }
}
