<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use App\Models\TaskStat;
use App\Models\Task;
use App\Models\TaskType;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\IOFactory;
class ReporteController extends Controller
{

    public function index()
    {
        return Inertia::render('Reportes/Index',[
            'TaskTypes' => TaskType::where('status', '1')->get(),
            'clientes' => User::where('status', '1')->where('rol_id', '2')->get(),
            'estados' => TaskStat::where('status', '1')->get(),
            'empresa' => Empresa::first(),
        ]);
    }
    public function dashboard()
    { 
        //total solicitures,solicitues pendientes, Tasks en el ultimo mes,total clientes, nuevos clientes ultimo mes,promedio Tasks por cliente
        $indicadores = [
            'total_Tasks' => Task::where('status_id', '!=', '5')->where('tipo_id', '>', '2')->count(),
            'Tasks_pendientes' => Task::where('status_id','<', '4')->where('tipo_id', '>', '2')->count(),
            'Tasks_ultimo_mes' => Task::where('created_at', '>=', date('Y-m-d', strtotime('-1 month')))->count(),
            'total_clientes' => User::where('rol_id', '2')->count(),
            'nuevos_clientes_ultimo_mes' => User::where('rol_id', '2')->where('created_at', '>=', date('Y-m-d', strtotime('-1 month')))->count(),
            'promedio_Tasks_por_cliente' => number_format((Task::where('status_id', '!=', '5')->where('tipo_id', '>', '2')->count() / User::where('rol_id', '2')->count()), 2, '.', ''),         
            
        ];
       
        return Inertia::render('dashboard/Index',[
            'TaskTypes' => TaskType::where('status', '1')->get(),
            'clientes' => User::where('status', '1')->where('rol_id', '2')->get(),
            'estados' => TaskStat::where('status', '1')->get(),
            'Task' => Task::all()->load('tipo', 'status', 'user','files.user','comentarios', 'userAsignado'),
            'indicadores' => $indicadores,
        ]);

    }

    public function Tasks_exel(Request $request)
    {

        $Tasks = $request->data['Tasks_f'];
    
      
        $spreadsheet = IOFactory::load(storage_path('app/templates/Tasks_x_fecha.xlsx'));
        $sheet = $spreadsheet->getActiveSheet();
        
        $filtro = 0;

        $datos = $request->data['datos'];
        $sheet->setCellValue('C7' , $datos['inicio']);
        $sheet->setCellValue('C8' , $datos['fin']);

        $sheet->setCellValue('H6' , $datos['usuario']);
        $sheet->setCellValue('H7' , $datos['fecha']);
        $sheet->setCellValue('H8' , $datos['hora']);

        $posiciones = [['B9','C9'],['G9','H9'],['B10','C10'],['G10','H10']];



        if($datos['tipo']){

            $sheet->insertNewRowBefore(9);

            $sheet->setCellValue($posiciones[$filtro][0] , 'Tipo:');
            $sheet->setCellValue($posiciones[$filtro][1] , $Tasks[0]['tipo']['name']);
            $filtro++;
        }

        if($datos['cliente']){
            if(!$filtro){
                $sheet->insertNewRowBefore(9);
            }
           
            $sheet->setCellValue($posiciones[$filtro][0] , 'Cliente:');
            $sheet->setCellValue($posiciones[$filtro][1] , $datos['cliente']);
           
            $filtro++;
        }
        

        if($datos['estado']){

          
            if(!$filtro || $filtro == 2 ){
                $sheet->insertNewRowBefore(9+($filtro/2));
            }

            $sheet->setCellValue($posiciones[$filtro][0] , 'Estado:');
            $sheet->setCellValue($posiciones[$filtro][1] , $Tasks[0]['status']['name']);
           

            $filtro++;
        }


        if($filtro%2 == 1){
            $filtro++;
        }
        
        $fila = 12+ ($filtro/2);
       
        foreach ($Tasks as $registro) {
         
            $sheet->setCellValue('B' . $fila, $registro['numero']);
            $sheet->setCellValue('C' . $fila, $registro['tipo']['name']);
            $sheet->setCellValue('D' . $fila, $registro['user']['name']);
            $sheet->setCellValue('E' . $fila, $registro['user']['rnc']);
            $fechaHoraObjeto = DateTime::createFromFormat('Y-m-d\TH:i:s.u\Z', $registro['created_at']) ;
            $sheet->setCellValue('F' . $fila, $fechaHoraObjeto ? $fechaHoraObjeto->format('d-m-Y h:i:s A') : $registro['created_at'] );
            $sheet->setCellValue('G' . $fila, $registro['status']['name']);
            $sheet->setCellValue('H' . $fila, $registro['user']['email']);
            $sheet->insertNewRowBefore($fila+1);
            $fila++;
        }

      
        $sheet->setCellValue('D' . $fila+1, count($Tasks));
    
        // Crear el flujo de salida
        $writer = new Xlsx($spreadsheet);
        ob_start();
        $writer->save('php://output');
        $content = ob_get_contents();
        ob_end_clean();
    
        // Devolver la respuesta al frontend
        return response($content, 200)
            ->header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            ->header('Content-Disposition', 'attachment; filename="reporte.xlsx"');
    }


    public function documentos_exel(Request $request)
    {

        
        $Tasks = $request->data['documentos_f'];
    
      
        $spreadsheet = IOFactory::load(storage_path('app/templates/documentos_x_fecha.xlsx'));
        $sheet = $spreadsheet->getActiveSheet();
        
        $filtro = 0;

        $datos = $request->data['datos'];
        $sheet->setCellValue('C7' , $datos['inicio']);
        $sheet->setCellValue('C8' , $datos['fin']);

        $sheet->setCellValue('H6' , $datos['usuario']);
        $sheet->setCellValue('H7' , $datos['fecha']);
        $sheet->setCellValue('H8' , $datos['hora']);

        $posiciones = [['B9','C9'],['G9','H9'],['B10','C10'],['G10','H10']];



        if($datos['cliente']){
          
            $sheet->insertNewRowBefore(9);
            $sheet->setCellValue($posiciones[$filtro][0] , 'Cliente:');
            $sheet->setCellValue($posiciones[$filtro][1] , $datos['cliente']);
           
            $filtro++;
        }
        
        if($filtro%2 == 1){
            $filtro++;
        }
        
        $fila = 12+ ($filtro/2);
       
        foreach ($Tasks as $registro) {
         
            $sheet->setCellValue('B' . $fila, $registro['id']);
            $sheet->setCellValue('C' . $fila, $registro['name']);
            $sheet->setCellValue('D' . $fila, $registro['extencion']);
            $sheet->setCellValue('E' . $fila, $registro['Task']['numero']);
            $sheet->setCellValue('F' . $fila, $registro['Task']['tipo']['name']);
            $sheet->setCellValue('G' . $fila, $registro['user']['name']);
            $fechaHoraObjeto = DateTime::createFromFormat('Y-m-d\TH:i:s.u\Z', $registro['created_at']) ;
            $sheet->setCellValue('H' . $fila, $fechaHoraObjeto ? $fechaHoraObjeto->format('d-m-Y h:i:s A') : $registro['created_at'] );
            $sheet->insertNewRowBefore($fila+1);
            $fila++;
        }

      
        $sheet->setCellValue('D' . $fila+1, count($Tasks));
    
        // Crear el flujo de salida
        $writer = new Xlsx($spreadsheet);
        ob_start();
        $writer->save('php://output');
        $content = ob_get_contents();
        ob_end_clean();
    
        // Devolver la respuesta al frontend
        return response($content, 200)
            ->header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            ->header('Content-Disposition', 'attachment; filename="reporte.xlsx"');
    }

}

