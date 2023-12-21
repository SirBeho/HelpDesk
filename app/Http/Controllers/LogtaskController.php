<?php

namespace App\Http\Controllers;

use App\Models\Logtask;
use App\Models\task;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class LogtaskController extends Controller
{
    /**
     * Display a listing of the resource. 
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return Logtask::with('user.rol', 'user.person')->get();

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
            $Logtask = Logtask::findOrFail($id);
            $Logtask->load('user');

            return $Logtask;
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El Logtask ' . $id . ' no existe no fue encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en la acción realizada'], 500);
        }

    }

    public function create(Request $request)
    {              
       
        try {

            if($request->created_at){
               
                $request->merge([
                    'descripcion' => "Se ha creado el bloque de " . ($request->tipo_id == 1 ? "Compras" : "Ventas") . " " . $request->descripcion,
                ]);
                
            }else if($request->status_ant){
                $request->merge([
                    'descripcion' => "Se ha actualizado la task ".$request->status_ant ."->". $request->status_id,
                ]);
            }else{
                $soli = task::find($request->task_id);
                $request->merge([
                    'descripcion' => "Se ha creado la task Numero: ".$soli->numero,
                ]);
            }

            $validator = validator($request->all(), [
                'task_id'=> 'required',
                'user_id'=> 'required|exists:users,id',
                'descripcion'=> 'required'
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            Logtask::create($request->all());

            return response()->json(['msj' =>  $request->descripcion], 200);
        
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'No se pudo registrar el Logtask'.$e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error en la accion realizada' . $e->getMessage()], 500);
        }
    }

    public function update($id,Request $request)
    {
        
        try {
            $validator = validator($request->all(), [
                'description'=> 'required',
                'user_id'=> 'required|exists:users,id',
                'ip'=> 'required',
                'so'=> 'required',
                'browser'=> 'required'
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $Logtask = Logtask::findOrFail($id);
            $Logtask->update($request->all());
            $Logtask->save();

           

            return response()->json(['msj' => 'Logtask actualizado correctamente'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El Logtask ' . $id . ' no existe no fue encontrado'], 404);
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
            $Logtask = Logtask::findOrFail($id);
            if ($Logtask->status) {
                $Logtask->status = 0;
                $Logtask->save();
                return response()->json(['msj' => 'Logtask eliminado correctamente'], 200);
            }
            return response()->json(['msj' => 'Este Logtask ya ha sido eliminado'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El Logtask ' . $id . ' no existe no fue encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en la acción realizada'], 500);
        }
    }

}
