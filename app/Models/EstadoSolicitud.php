<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskStat extends Model
{
    use HasFactory;
    protected $table = "estado_Tasks";

    protected $fillable = [
        'name',
        'status',
    ];
}
