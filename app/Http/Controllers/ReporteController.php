<?php

namespace App\Http\Controllers;

use DateTime;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Response;
use PhpOffice\PhpSpreadsheet\Style\Style;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ReporteController extends Controller
{
    public function solicitudes_exel(Request $request)
    {


        $solicitudes = $request->data['solicitudes_f'];
    
      
        $spreadsheet = IOFactory::load(storage_path('app/templates/solicitudes_x_fecha.xlsx'));
        $sheet = $spreadsheet->getActiveSheet();
        
        $filtro = 0;

        $datos = $request->data['datos'];
        $sheet->setCellValue('C7' , $datos['inicio']);
        $sheet->setCellValue('C8' , $datos['fin']);

        $sheet->setCellValue('H6' , $datos['usuario']);
        $sheet->setCellValue('H7' , $datos['fecha']);
        $sheet->setCellValue('H8' , $datos['hora']);

        if($datos['tipo']){

            $sheet->insertNewRowBefore(9);
            $sheet->setCellValue('B9' , 'Tipo:');
            $sheet->setCellValue('C9' , $solicitudes[0]['tipo']['nombre']);
            $filtro++;
          
        }

        if($datos['cliente']){
            if($filtro){
                $sheet->setCellValue('G9' , 'Cliente:');
                $sheet->setCellValue('H9' , $datos['cliente']);
               
            }else{
                $sheet->insertNewRowBefore(9);
                $sheet->setCellValue('B9' , 'Cliente:');
                $sheet->setCellValue('C9' , $datos['cliente']);
                $filtro++;
            }
        }

        $fila = 12+$filtro;
       
        foreach ($solicitudes as $registro) {
         
            $sheet->setCellValue('B' . $fila, $registro['numero']);
            $sheet->setCellValue('C' . $fila, $registro['tipo']['nombre']);
            $sheet->setCellValue('D' . $fila, $registro['user']['name']);
            $sheet->setCellValue('E' . $fila, $registro['user']['rnc']);
            $fechaHoraObjeto = DateTime::createFromFormat('Y-m-d\TH:i:s.u\Z', $registro['created_at']) ;
            $sheet->setCellValue('F' . $fila, $fechaHoraObjeto ? $fechaHoraObjeto->format('d-m-Y h:i:s A') : $registro['created_at'] );
            $sheet->setCellValue('G' . $fila, $registro['status']['nombre']);
            $sheet->setCellValue('H' . $fila, $registro['user']['email']);
            $sheet->insertNewRowBefore($fila+1);
            $fila++;
        }

      
        $sheet->setCellValue('D' . $fila+1, count($solicitudes));
    
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

