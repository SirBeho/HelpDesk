<?php

namespace Database\Seeders;

use App\Models\TaskType;
use Illuminate\Database\Seeder;

class TaskTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TaskType::factory()->create([
            'name' => 'front-ent application development', 
        ]);

        TaskType::factory()->create([
            'name' => 'Back-ent application development',
        ]);

        TaskType::factory()->create([
            'name' => 'Full-Stack application development',
        ]);

        TaskType::factory()->create([
            'name' => 'Development website',
        ]);

        TaskType::factory()->create([
            'name' => 'Development mobile application',
        ]);

        TaskType::factory()->create([
            'name' => 'Development desktop application',
        ]);
    }
}
