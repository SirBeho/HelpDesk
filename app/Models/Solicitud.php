<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class task extends Model
{
    use HasFactory;
    protected $table = "taskes";

    protected $fillable = [
       
        'numero',
        'tipo_id',
        'created_at',
        'user_id',      
        'status_id',      
        'descripcion',
        'status',
      
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($task) {

            $ultimoRegistro = task::max('numero');
            $task->numero = $ultimoRegistro ? ($ultimoRegistro + 1) : 10000;
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
        return $this->BelongsTo(Tipotask::class,'tipo_id');
    }

    public function status(): BelongsTo
    {
        return $this->BelongsTo(Estadotask::class,'status_id');
    }

    public function files(): HasMany
    {
        return $this->hasMany(File::class,'task_id');
    }

    public function comentarios(): HasMany
    {
        return $this->hasMany(Comentario::class,'task_id')->orderBy('created_at', 'desc');;
    }

    public function notificaciones(): HasMany
    {
        return $this->hasMany(Notificacion::class,'task_id');
    }



    

  


}

