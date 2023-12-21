<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        User::factory()->create([
 
            'name' => "admin",
            'email' => "benjamin.tavarez.98@gmail.com",
            'email_verified_at' => now(),
            'password' => "admin", 
            'telefono'=> "8098892235",
            'rol_id'=> 1,  
        ]);

        User::factory(20)->create();
    }
}
