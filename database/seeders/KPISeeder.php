<?php

namespace Database\Seeders;

use App\Models\KPI;
use Illuminate\Database\Seeder;

class KPISeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        KPI::factory()->create([
            'name' => 'Tasks on time',
        ]);

        KPI::factory()->create([
            'name' => 'quality',
        ]);
    }
}
