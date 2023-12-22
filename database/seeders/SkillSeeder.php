<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       
        Skill::factory()->create([
            'skill_name' => 'PHP',
        ]);

        Skill::factory()->create([
            'skill_name' => 'JavaScript',
        ]);

        Skill::factory()->create([
            'skill_name' => 'Java',
        ]);

        Skill::factory()->create([
            'skill_name' => 'C#',
        ]);

        Skill::factory()->create([
            'skill_name' => 'HTML',
        ]);

        Skill::factory()->create([
            'skill_name' => 'SQL',
        ]);

        Skill::factory()->create([
            'skill_name' => 'Git',
        ]);

        Skill::factory()->create([
            'skill_name' => 'Scrum',
        ]);
     
    }
}
