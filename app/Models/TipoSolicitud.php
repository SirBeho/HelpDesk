<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tipotask extends Model
{
    use HasFactory;
    protected $table = "tipo_taskes";

    protected $fillable = [
        'nombre',
        'tipo',
        'status',
    ];


}
