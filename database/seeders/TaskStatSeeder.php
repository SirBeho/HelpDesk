<?php

namespace Database\Seeders;

use App\Models\TaskStat;
use Illuminate\Database\Seeder;

class TaskStatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TaskStat::factory()->create([
            'name'=> "creada",
            'status'=> 1 
        ]);
        TaskStat::factory()->create([
            'name'=> "asignada",
            'status'=> 1 
        ]);
        TaskStat::factory()->create([
            'name'=> "en proceso",
            'status'=> 1 
        ]);
        TaskStat::factory()->create([
            'name'=> "pendiente por validar",
            'status'=> 1 
        ]);
        TaskStat::factory()->create([
            'name'=> "completada",
            'status'=> 1 
        ]);
        TaskStat::factory()->create([
            'name'=> "cerrada",
            'status'=> 1 
        ]);
        TaskStat::factory()->create([
            'name'=> "rechazada",
            'status'=> 1 
        ]);
        TaskStat::factory()->create([
            'name'=> "cancelada",
            'status'=> 1 
        ]);
    }
}
