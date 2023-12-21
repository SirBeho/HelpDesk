<?php

namespace App\Http\Controllers;

use App\Models\Estadotask;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class EstadotaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return Estadotask::all();

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
            $Estadotask = Estadotask::findOrFail($id);
       

            return $Estadotask;
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El Estadotask ' . $id . ' no existe no fue encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en la acción realizada'], 500);
        }

    }

    public function create(Request $request)
    {               
        try {

            $validator = validator($request->all(), [
                'nombre'=> 'required',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            Estadotask::create($request->all());
           
          
            return response()->json(['msj' =>  $request->description], 200);
        
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'No se pudo registrar el Estadotask'.$e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error en la accion realizada' . $e->getMessage()], 500);
        }
    }

    public function update($id,Request $request)
    {
        
        try {
            $validator = validator($request->all(), [
                'nombre'=> 'required',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $Estadotask = Estadotask::findOrFail($id);
            $Estadotask->update($request->all());
            $Estadotask->save();
            
            return response()->json(['msj' => 'Estadotask actualizado correctamente'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El Estadotask ' . $id . ' no existe no fue encontrado'], 404);
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
            $Estadotask = Estadotask::findOrFail($id);
            if ($Estadotask->status) {
                $Estadotask->status = 0;
                $Estadotask->save();
                return response()->json(['msj' => 'Estadotask eliminado correctamente'], 200);
            }
            return response()->json(['msj' => 'Este Estadotask ya ha sido eliminado'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El Estadotask ' . $id . ' no existe no fue encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en la acción realizada'], 500);
        }
    }
}
