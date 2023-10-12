<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Solicitud extends Model
{
    use HasFactory;
    protected $table = "solicitudes";

    protected $fillable = [
       
        'numero',
        'tipo_id',
        'created_at',
        'user_id',      
        'status_id',      
        'comentario',
        'status',
      
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($solicitud) {

            $ultimoRegistro = Solicitud::latest()->first();
            $solicitud->numero = $ultimoRegistro ? ($ultimoRegistro->numero + 1) : 10000;
        });
    }


  
    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class,'user_id');
    }

    public function tipo(): BelongsTo
    {
        return $this->BelongsTo(TipoSolicitud::class,'tipo_id');
    }

    public function status(): BelongsTo
    {
        return $this->BelongsTo(EstadoSolicitud::class,'status_id');
    }

    public function files(): HasMany
    {
        return $this->hasMany(File::class,'solicitud_id');
    }


}

