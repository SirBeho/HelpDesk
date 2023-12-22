<?php

namespace App\Http\Controllers;

use App\Models\LogTask;
use App\Models\Task;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class LogTaskController extends Controller
{
    /**
     * Display a listing of the resource. 
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return LogTask::with('user.rol', 'user.person')->get();

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
            $LogTask = LogTask::findOrFail($id);
            $LogTask->load('user');

            return $LogTask;
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El LogTask ' . $id . ' no existe no fue encontrado'], 404);
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
                    'descripcion' => "Se ha actualizado la Task ".$request->status_ant ."->". $request->status_id,
                ]);
            }else{
                $soli = Task::find($request->Task_id);
                $request->merge([
                    'descripcion' => "Se ha creado la Task Numero: ".$soli->numero,
                ]);
            }

            $validator = validator($request->all(), [
                'Task_id'=> 'required',
                'user_id'=> 'required|exists:users,id',
                'descripcion'=> 'required'
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            LogTask::create($request->all());

            return response()->json(['msj' =>  $request->descripcion], 200);
        
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'No se pudo registrar el LogTask'.$e->getMessage()], 404);
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

            $LogTask = LogTask::findOrFail($id);
            $LogTask->update($request->all());
            $LogTask->save();

           

            return response()->json(['msj' => 'LogTask actualizado correctamente'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El LogTask ' . $id . ' no existe no fue encontrado'], 404);
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
            $LogTask = LogTask::findOrFail($id);
            if ($LogTask->status) {
                $LogTask->status = 0;
                $LogTask->save();
                return response()->json(['msj' => 'LogTask eliminado correctamente'], 200);
            }
            return response()->json(['msj' => 'Este LogTask ya ha sido eliminado'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El LogTask ' . $id . ' no existe no fue encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en la acción realizada'], 500);
        }
    }

}
