<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estadotask extends Model
{
    use HasFactory;
    protected $table = "estado_taskes";

    protected $fillable = [
        'nombre',
        'status',
    ];
}
