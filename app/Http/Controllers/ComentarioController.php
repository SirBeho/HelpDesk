<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class ComentarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

       
                try {
           
            $mensajes = [
                'task_id' => 'El tipo de task no existe.',
                'comentario' => 'El comentario no puede estar en blanco.',
            ];

            $validator = validator($request->all(), [
                'task_id' => 'required|exists:taskes,id',
                'comentario' => 'required'
            ],$mensajes);
           
            if ($validator->fails()) {
                return redirect()->route('admtaskes')->with('msj', ['error'=> array_values( $validator->errors()->messages())], 404);
            }

           Comentario::create([
                "task_id" => $request->task_id,
                "comentario" => $request->comentario
           ]);

        
            session()->put('msj', ["success" => "El comentario ha sido añadido a la task"]);
        
        } catch (Exception $e) {
            session()->put('msj', ["error" => 'Error en la accion realizada' ]);
           
        }
        
        return redirect('admtaskes');
    }


    public function store(Request $request)
    {
        //
    }

    public function show(Comentario $comentario)
    {
        //
    }

  
    public function edit(Comentario $comentario)
    {
        //
    }


    public function update(Request $request, Comentario $comentario)
    {
        //
    }

  
    public function destroy(Request $request)
    {
       
        $validator = validator($request->all(), [
            'comentario_id' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return redirect()->route('admtaskes')->with('msj', ['error'=> array_values( $validator->errors()->messages())], 404);
        }

        try {
            $Comentario = Comentario::findOrFail($request->comentario_id);
            if ($Comentario->status) {
                $Comentario->status = 0;
                $Comentario->save();
                session()->put('msj', ["success" => 'Comentario eliminado correctamente']);
                return redirect('admtaskes');
            }
            session()->put('msj', ["success" => 'Este Comentario ya ha sido eliminado']);
        } catch (ModelNotFoundException $e) {
            session()->put('msj', ["error" => 'El Comentario no existe no fue encontrado' ]);
           
        } catch (\Exception $e) {
            session()->put('msj', ["error" => 'Error en la accion realizada' ]);
            
        }

    return redirect('admtaskes');

    }
}
