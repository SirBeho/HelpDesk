<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

class TaskTypeSkillFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

      
        
        return [
            'task_type_id' => function () {
                return DB::table('TaskTypes')->inRandomOrder()->first()->id;
            },
            'skill_id' => function () {
                return DB::table('skills')->inRandomOrder()->first()->id;
            },
            'level' => $this->faker->numberBetween(0, 5),
        ];
    }
}
