<?php

namespace Database\Seeders;

use App\Models\EstadoSolicitud;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EstadoSolicitudSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EstadoSolicitud::factory()->create([
            'nombre'=> "Enviado",
            'status'=> 1 
        ]);

        EstadoSolicitud::factory()->create([
            'nombre'=> "En proceso",
            'status'=> 1 
        ]);

        EstadoSolicitud::factory()->create([
            'nombre'=> "Finalizado",
            'status'=> 1 
        ]);

    }
}
