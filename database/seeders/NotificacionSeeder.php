<?php

namespace Database\Seeders;

use App\Models\Notificacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NotificacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Notificacion::factory()->create([
            'task_id' => 3,
            'emisor_id' => 2,
            'receptor_id' => 1,
            'status' => 0, 
            'message' => 'El estado de la task ha cambiado'
        ]);
        Notificacion::factory()->create([
            'task_id' => 1,
            'emisor_id' => 2,
            'receptor_id' => 1,
            'status' => 0, 
            'message' => 'El estado de la task ha cambiado'
        ]);
        Notificacion::factory()->create([
            'task_id' => 2,
            'emisor_id' => 2,
            'receptor_id' => 1,
            'status' => 0, 
            'message' => 'El estado de la task ha cambiado'
        ]);
    }
}
