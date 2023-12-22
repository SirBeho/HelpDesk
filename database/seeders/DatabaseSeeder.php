<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\TaskType;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

       
       
        $this->call(RolSeeder::class);
        $this->call(SkillSeeder::class);
        
        $this->call(KPISeeder::class);
        $this->call(UserSeeder::class);
        
        
        $this->call(UserKPISeeder::class);
        $this->call(UserSkillSeeder::class);
        
        $this->call(PrioritySeeder::class);
        $this->call(TaskTypeSeeder::class);
        $this->call(TaskTypeSkillSeeder::class);
        $this->call(TaskStatSeeder::class);
        $this->call(TransitionStatSeeder::class);

        
    }
}
