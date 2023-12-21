<?php

namespace App\Http\Controllers;

use App\Models\Estadotask;
use App\Models\Notificacion;
use App\Models\task;
use App\Models\Tipotask;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class taskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mensaje = session('msj');
        if ($mensaje) {
            Session::forget('msj');
        }
        return Inertia::render('taskes/Index', [
            'datos' => Tipotask::where('status', '1')->get(),
            'msj' => $mensaje,
        ]);
    }

    public function administracion(Request $request)
    {
        $mensaje = session('msj');
        $task_id = session('task_id');

        $task_id && session()->forget('task_id');

        if (!$task_id) {
            $task_id =  $request->id;
        }

        if ($mensaje) {
            session()->forget('msj');
        }

        return Inertia::render('Admtaskes/Index', [
            'tipotaskes' => Tipotask::where('status', '1')->get(),
            'statusList' => Estadotask::select('id', 'nombre')->where('status', 1)->get(),
            'msj' => $mensaje,
            'task_id' => $task_id,
        ]);
    }

    public function panel(Request $request)
    {
        $mensaje = session('msj');
        Session::forget('msj');

        return Inertia::render('Panel/Index', [
            'msj' => $mensaje,
            'clientes' => User::where("rol_id", 2)->get(),

        ]);
    }

    public function create(Request $request)
    {   

        try {
            $request->merge([
                'user_id' => Auth::user()->id,
                'status_id' => 1,
            ]);

            $validator = validator($request->all(), [
                'tipo_id' => 'exists:tipo_taskes,id',
                'created_at' => 'date',
                'user_id' => 'exists:users,id',
                'status_id' => 'exists:estado_taskes,id',
                'descripcion' => 'required',
            ], [
                'tipo_id.exists' => 'El tipo de task seleccionado no es válido.',
                'user_id.exists' => 'El usuario seleccionado no es válido.',
                'descripcion.required' => 'La descripción es obligatoria.',
            ]);



            if ($validator->fails()) {
                session()->put('msj', ['error' => array_values($validator->errors()->messages())]);

                return back();
            }

            $task = task::create($request->all());

            $request->merge([
                'task_id' =>  $task->id,
            ]);

            if ($request->tipo_id > 2) {
                Notificacion::create(
                    [
                        'task_id' =>  $task->id,
                        'emisor_id' => Auth::user()->id,
                        'message' => "Has recibido una nueva task"
                    ]
                );
            }


            if($request->created_at){
               
                $request->merge([
                    'descripcion' => "Se ha creado el bloque de " . ($request->tipo_id == 1 ? "Compras" : "Ventas") . " " . $request->descripcion,
                ]);
                
            }else{
                $soli = task::find($request->task_id);
                $request->merge([
                    'descripcion' => "Se ha creado la task Numero: ".$soli->numero,
                ]);
            }


            // $log = new LogtaskController();

            // $respuesta = $log->create($request);

            session()->put('msj', ["success" => $request->descripcion, "id" => $task->id]);

            //  return response()->json(['msj' => 'task creada correctamente','log' => $respuesta->original['msj']], 200);
        } catch (ModelNotFoundException $e) {
            session()->put('msj', ["error" => 'No se pudo registrar la task']);
        } catch (QueryException $e) {

            $errormsj = $e->getMessage();

            if (strpos($errormsj, 'Duplicate entry') !== false) {
                preg_match("/Duplicate entry '(.*?)' for key '(.*?)'/", $errormsj, $matches);
                $duplicateValue = $matches[1] ?? '';
                $duplicateKey = $matches[2] ?? '';
                if ($duplicateKey == 'taskes_tipo_id_user_id_created_at_unique') {
                    $fecha = Carbon::parse(substr($duplicateValue, 4))->locale('es');
                    session()->put('msj', ["errord" => "Ya existe un bloque para " . $duplicateValue]);
                } else {

                    session()->put('msj', ["error" => "No se puede realizar la acción, el valor '$duplicateValue' está duplicado"], 422);
                }
            } else {
                session()->put('msj', ["error" => 'No se pudo registrar el task']);
            }
        } catch (Exception $e) {
            session()->put('msj', ["error" => 'Error en la accion realizada']);
        }

        if (isset($request->created_at)) {
            return redirect('panel');
        }
        return redirect('taskes');
    }

    public function update(Request $request)
    {
        try {
            
            $mensajes = [
                'tipo_id' => 'El tipo de task no existe.',
                'created_at' => 'La fecha de creacion no es valida.',
                'user_id' => 'El usuario no existe.',
                'status_id' => 'El estado seleccionado no existe.',
                'descripcion' => 'La descripcion no puede estar en blanco.',
            ];

            $validator = validator($request->all(), [

                'id' => 'required|exists:taskes,id',
                'tipo_id' => 'exists:tipo_taskes,id',
                'created_at' => 'date',
                'user_id' => 'exists:users,id',
                'status_id' => 'exists:estado_taskes,id',
                'descripcion' => 'required',

            ], $mensajes);

           

            if ($validator->fails()) {

                session()->put('msj', ['error' => array_values($validator->errors()->messages())]);

                return back();


            }

           
            $task = task::findOrFail($request->id);
            $status_ant = Estadotask::find($task->status_id);
            $status_act = Estadotask::find($request->status_id) ?? $status_ant;

            $request->merge([
                'task_id' => $request->id,
                'status_ant' => $task->status_id,
                'message' => "El estado de la task No. $request->numero Ha cambiado de $status_ant->nombre a $status_act->nombre"
            ]);

            
            $task->update($request->all());

            if (Auth::user()->rol_id == 3) {
                $task->usuarioAsignado_id = Auth::user()->id;
            }
            
            $task->save();

            if ($request->status_ant != $request->status_id) {
                // $log = new LogtaskController();
                // $respuesta = $log->create($request);

                $request->merge([
                    'descripcion' => "Se ha actualizado la task ".$request->status_ant ."->". $request->status_id,
                ]);

                Notificacion::create(
                    [
                        'task_id' => $request->id,
                        'emisor_id' => Auth::user()->id,
                        'receptor_id' => $request->user_id,
                        'message' => $request->message
                    ]
                );
            }

            if (isset($request->created_at)) {
                return redirect('panel')->with('msj', ['success' => 'Bloque actualizado correctamente']);
            }
           
            return redirect()->route('admtaskes')
                ->with('msj', ['success' => 'task actualizada correctamente'])
                ->with('task_id', $request->id);
        } catch (ModelNotFoundException $e) {

            return redirect()->route('admtaskes')->with('msj', ['error' => 'El task ' . $request->id . ' no existe no fue encontrado'], 404);
        } catch (QueryException $e) {

            $errormsj = $e->getMessage();

            if (strpos($errormsj, 'Duplicate entry') !== false) {
                preg_match("/Duplicate entry '(.*?)' for key '(.*?)'/", $errormsj, $matches);
                $duplicateValue = $matches[1] ?? '';
                $duplicateKey = $matches[2] ?? '';
                if ($duplicateKey == 'taskes_tipo_id_user_id_created_at_unique') {
                    $fecha = Carbon::parse(substr($duplicateValue, 4))->locale('es');
                    session()->put('msj', ["errord" => "Ya existe un bloque para " . $duplicateValue]);
                } else {

                    session()->put('msj', ["error" => "No se puede realizar la acción, el valor '$duplicateValue' está duplicado"], 422);
                }
            } else {
                session()->put('msj', ["error" => 'No se pudo registrar el task']);
            }
        }  catch (Exception $e) {

            return redirect()->route('admtaskes')->with('msj', ['error' => 'Error en la acción realizada'], 500);
        }

        return back();
    }

    public function destroy($id)
    {
        $validator = validator(['id' => $id], [
            'id' => 'required|numeric|exists:taskes,id'
        ]);

       if ($validator->fails()) {
                return redirect()->route('admtaskes')->with('msj', ['error' => array_values($validator->errors()->messages())], 404);
            }

        try {
            $task = task::findOrFail($id)->load('files','notificaciones');

            
            if(auth()->user()->rol_id == 2){
               
                if(count($task->files) == 0){
                    
                    $task->notificaciones->each->delete();
                    $task->delete();   

                    session()->put('msj', ["success" => 'Bloque eliminado correctamente']);
                   
                }else{
                    session()->put('msj', ["error" => 'No se puede eliminar la task porque tiene archivos adjuntos']);
                   
                }
            } elseif(auth()->user()->rol_id == 1){

                $task->files->each->delete();
                $task->notificaciones->each->delete();
                $task->delete();
                //eliminar todos los archivos relacionados a la task   
        
            }

            return back();    
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El task ' . $id . ' no existe no fue encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en la acción realizada'.$e], 500);
        }
    }
}
