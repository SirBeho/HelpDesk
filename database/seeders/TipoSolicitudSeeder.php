<?php

namespace Database\Seeders;

use App\Models\TipoSolicitud;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoSolicitudSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TipoSolicitud::factory()->create([
            'nombre'=> "Servicio",
            'status'=> 1 
        ]);

        TipoSolicitud::factory()->create([
            'nombre'=> "Certificaciones",
            'status'=> 1 
        ]);

        TipoSolicitud::factory()->create([
            'nombre'=> "Estados Financieros",
            'status'=> 1 
        ]);

        TipoSolicitud::factory()->create([
            'nombre'=> "Reportes Generales",
            'status'=> 1 
        ]);
    }
}
