<?php

namespace Database\Seeders;

use App\Models\Empresa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmpresaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       Empresa::factory()->create([
        'RNC'=> '123456789',
        'empresa'=> 'Nombre Empresa',
        'direccion'=> 'c/ 10 este #23 Santa cruz',
        'telefono'=> '987-655-443322',
        'telefono2'=> '987-655-443322'
       ]);
    }
}
