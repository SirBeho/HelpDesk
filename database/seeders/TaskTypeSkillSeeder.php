<?php

namespace Database\Seeders;

use App\Models\TaskType;
use App\Models\TaskTypeSkill;
use Illuminate\Database\Seeder;

class TaskTypeSkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TaskTypeSkill::factory(50)->create();
    }
}
