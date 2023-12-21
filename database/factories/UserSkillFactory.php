<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

class UserSkillFactory extends Factory
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
                'skill' => function () {
                    return DB::table('skills')->inRandomOrder()->first()->id;
                },
                'level' => $this->faker->numberBetween(0, 5),
            ];


            
        
    }
}
