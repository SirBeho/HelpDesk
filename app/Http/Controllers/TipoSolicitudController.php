<?php

namespace App\Http\Controllers;

use App\Models\TipoSolicitud;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TipoSolicitudController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $TipoSolicitudes =  TipoSolicitud::all();

        return Inertia::render('Mantenimiento/Index', [
            'tipoSolicitudes' => $TipoSolicitudes
        ]);
    }

    public function create(Request $request)
    {
        try {

            $validator = validator($request->all(), [
                'nombre' => 'required',
                'tipo' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            TipoSolicitud::create($request->all());
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'No se pudo registrar el TipoSolicitud' . $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error en la accion realizada' . $e->getMessage()], 500);
        }

        return redirect('configuracion');
    }

    public function update(Request $request)
    {

        try {
            $validator = validator($request->all(), [
                'id' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $TipoSolicitud = TipoSolicitud::findOrFail($request->id);
            $TipoSolicitud->update($request->all());

            return response()->json(['msj' => 'TipoSolicitud actualizado correctamente'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El TipoSolicitud ' . $request->id . ' no existe no fue encontrado'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error en la acción realizada'], 500);
        }
        return redirect('configuracion');
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
            $TipoSolicitud = TipoSolicitud::findOrFail($id);
            if ($TipoSolicitud->status) {
                $TipoSolicitud->status = 0;
                $TipoSolicitud->save();
                return response()->json(['msj' => 'TipoSolicitud eliminado correctamente'], 200);
            }
            return response()->json(['msj' => 'Este TipoSolicitud ya ha sido eliminado'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El TipoSolicitud ' . $id . ' no existe no fue encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en la acción realizada'], 500);
        }
    }
}
