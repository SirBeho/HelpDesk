<?php

namespace Database\Seeders;


use App\Models\UserKpi ;
use Illuminate\Database\Seeder;

class UserKpiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        UserKpi::factory()->count(10)->create();

       // User_KPI::factory()->count(19)->create();

    }
}
