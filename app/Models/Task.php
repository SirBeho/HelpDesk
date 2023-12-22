<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    use HasFactory;
    protected $table = "Tasks";

    protected $fillable = [
        'name_tarea',
        'serial_number',
        'descripcion_detallada',
        'date_finish',
        'priority',
        'task_type_id',
        'estiamted_time',
        'real_time',
        'status',
      
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($Task) {

            $ultimoRegistro = Task::max('numero');
            $Task->serial_number  = $ultimoRegistro ? ($ultimoRegistro + 1) : 10000;
        });
    }


  
    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class,'user_id');
    }

    public function userAsignado(): BelongsTo
    {
        return $this->BelongsTo(User::class,'usuarioAsignado_id');
    }

    public function tipo(): BelongsTo
    {
        return $this->BelongsTo(TaskType::class,'tipo_id');
    }

    public function status(): BelongsTo
    {
        return $this->BelongsTo(TaskStat::class,'status_id');
    }

    public function files(): HasMany
    {
        return $this->hasMany(File::class,'Task_id');
    }

    public function comentarios(): HasMany
    {
        return $this->hasMany(Comentario::class,'Task_id')->orderBy('created_at', 'desc');;
    }

    public function notificaciones(): HasMany
    {
        return $this->hasMany(Notificacion::class,'Task_id');
    }



    

  


}

