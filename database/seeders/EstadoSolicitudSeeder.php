<?php

namespace Database\Seeders;

use App\Models\Estadotask;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EstadotaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Estadotask::factory()->create([
            'nombre'=> "Enviado",
            'status'=> 1 
        ]);
        Estadotask::factory()->create([
            'nombre'=> "En proceso",
            'status'=> 1 
        ]);
        Estadotask::factory()->create([
            'nombre'=> "A espera de corrección ",
            'status'=> 1 
        ]);
        Estadotask::factory()->create([
            'nombre'=> "Detenida",
            'status'=> 1 
        ]);
        Estadotask::factory()->create([
            'nombre'=> "Cancelada",
            'status'=> 1 
        ]);
        Estadotask::factory()->create([
            'nombre'=> "Completada",
            'status'=> 1 
        ]);
       
        
    }
}
