<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

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
        

        
        
    }
}
