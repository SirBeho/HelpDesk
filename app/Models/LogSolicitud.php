<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LogTask extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "log_Tasks";
    protected $fillable = [
       
        'Task_id',
        'user_id',
        'descripcion', 
        'status',
    ];


  
    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class,'user_id');
    }

    public function Task(): BelongsTo
    {
        return $this->BelongsTo(Task::class,'Task_id');
    }

    


  
}


