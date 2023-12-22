<?php

namespace Database\Seeders;

use App\Models\Priority;
use Illuminate\Database\Seeder;

class PrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Priority::factory()->create([
            'name' => 'azul',
            'increase_time' => 0.2
        ]);


        Priority::factory()->create([
            'name' => 'verde',
            'increase_time' => 0.1
        ]);

        Priority::factory()->create([
            'name' => 'amarillo',
            'increase_time' => 0
        ]);

        Priority::factory()->create([
            'name' => 'naranja',
            'increase_time' => -0.1
        ]);

        Priority::factory()->create([
            'name' => 'rojo',
            'increase_time' => -0.2
        ]);
    }
}
