<?php

namespace Database\Seeders;

use App\Models\TransitionStat;
use Illuminate\Database\Seeder;

class TransitionStatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

      
        TransitionStat::factory()->create([
            'state_from_id'=> 1,
            'state_to_id'=> 2,
        ]);

        TransitionStat::factory()->create([
            'state_from_id'=> 2,
            'state_to_id'=> 3,
        ]);
        TransitionStat::factory()->create([
            'state_from_id'=> 2,
            'state_to_id'=> 7,
        ]);
        TransitionStat::factory()->create([
            'state_from_id'=> 3,
            'state_to_id'=> 2,
        ]);
        TransitionStat::factory()->create([
            'state_from_id'=> 3,
            'state_to_id'=> 7,
        ]);
        TransitionStat::factory()->create([
            'state_from_id'=> 3,
            'state_to_id'=> 4,
        ]);
        TransitionStat::factory()->create([
            'state_from_id'=> 4,
            'state_to_id'=> 3,
        ]);
        TransitionStat::factory()->create([
            'state_from_id'=> 4,
            'state_to_id'=> 5,
        ]);
        TransitionStat::factory()->create([
            'state_from_id'=> 5,
            'state_to_id'=> 3,
        ]);
        TransitionStat::factory()->create([
            'state_from_id'=> 5,
            'state_to_id'=> 8,
        ]);
        TransitionStat::factory()->create([
            'state_from_id'=> 7,
            'state_to_id'=> 2,
        ]);
        

    }
}
