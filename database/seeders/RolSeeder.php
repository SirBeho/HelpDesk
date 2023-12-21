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
            'rol_name' => 'admin',
        ]);

        Rol::factory()->create([
            'rol_name' => 'manager',
        ]);

        Rol::factory()->create([
            'rol_name' => 'supervisor',
        ]);
        Rol::factory()->create([
            'rol_name' => 'User',
        ]);

      
        

    }
}
