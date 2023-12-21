<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Logtask extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "log_taskes";
    protected $fillable = [
       
        'task_id',
        'user_id',
        'descripcion', 
        'status',
    ];


  
    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class,'user_id');
    }

    public function task(): BelongsTo
    {
        return $this->BelongsTo(task::class,'task_id');
    }

    


  
}


