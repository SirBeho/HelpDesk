<?php

namespace Database\Seeders;

use App\Models\Rol;
use Illuminate\Database\Seeder;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Rol::factory()->create([
            'name' => 'admin',
        ]);

        Rol::factory()->create([
            'name' => 'manager',
        ]);

        Rol::factory()->create([
            'name' => 'supervisor',
        ]);
        Rol::factory()->create([
            'name' => 'User',
        ]);

      
        

    }
}
