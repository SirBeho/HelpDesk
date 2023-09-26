<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class File extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = "files";
    protected $fillable = [
        'referencia',
        'nombre',
        'extencion', 
        'confidencial', 
        'user_id', 
        'solicitud_id', 
    ];


  
    public function emisor(): BelongsTo
    {
        return $this->BelongsTo(User::class,'emisor_id');
    }
    public function receptor(): BelongsTo
    {
        return $this->BelongsTo(User::class,'receptor_id');
    }




}
