<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

class UserKpiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        
            return [
                'user_id' => function () {
                    return DB::table('users')->inRandomOrder()->first()->id;
                },
                'KPI_id' => function () {
                    return DB::table('kpis')->inRandomOrder()->first()->id;
                },
                'level' => $this->faker->numberBetween(0, 5),
            
        ];
    }
}
