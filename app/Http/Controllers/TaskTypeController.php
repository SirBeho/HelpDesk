<?php

namespace App\Http\Controllers;

use App\Models\TaskType;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class TaskTypeController extends Controller
{

    public function index()
    {
        $mensaje = session('msj');
        if ($mensaje) {
            Session::forget('msj');
        }

        $TaskTypes =  TaskType::where('tipo', '>',  0)->get();

        return Inertia::render('Mantenimiento/Index', [
            'TaskTypes' => $TaskTypes,
            'msj' => $mensaje
        ]);
    }

    public function create(Request $request)
    {
        try {
            $mensajes = [
                'name.required' => 'El name no puede estar en blanco',
                'tipo.required' => 'El tipo no puede estar en blanco',

            ];

            $validator = validator($request->all(), [
                'name' => 'required',
                'tipo' => 'required'
            ], $mensajes);

            if ($validator->fails()) {

                return redirect()->route('usuarios.index')->with('msj', ['error' => array_values($validator->errors()->messages())], 404);
            }

            TaskType::create($request->all());

            session()->put('msj', ["success" => 'Tipo de Task creada con exito']);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'No se pudo registrar el TaskType' . $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error en la accion realizada' . $e->getMessage()], 500);
        }

        return redirect(route('TaskType.index'));
    }

    public function update(Request $request)
    {

        try {
            $mensajes = [
                'id.exists' => 'El id es invalido',
                'id.required' => 'El id no puede estar en blanco',

            ];

            $validator = validator($request->all(), [
                'id' => 'required|exists:TaskTypes,id',
            ], $mensajes);

            if ($validator->fails()) {

                return redirect()->route('usuarios.index')->with('msj', ['error' => array_values($validator->errors()->messages())], 404);
            }


            $TaskType = TaskType::findOrFail($request->id);
            $TaskType->update($request->all());

            session()->put('msj', ["success" => 'Tipo de Task actializada con exito']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El TaskType ' . $request->id . ' no existe no fue encontrado'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error en la acción realizada'], 500);
        }
        return redirect(route('TaskType.index'));
    }

    public function destroy($id)
    {
        try {

            $mensajes = [
                'id.exists' => 'El id es invalido',
                'id.required' => 'El id no puede estar en blanco',
    
            ];
    
            $validator = validator(['id' => $id], [
                'id' => 'required|exists:TaskTypes,id',
            ], $mensajes);
    
            if ($validator->fails()) {
    
                return redirect()->route('usuarios.index')->with('msj', ['error' => array_values($validator->errors()->messages())], 404);
            }

            $TaskType = TaskType::findOrFail($id);
            $TaskType->delete();
             
            session()->put('msj', ["success" => 'Tipo de Task eliminada con exito']);
         
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El TaskType ' . $id . ' no existe no fue encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en la acción realizada'], 500);
        }
        return redirect(route('TaskType.index'));
    }

   
}
