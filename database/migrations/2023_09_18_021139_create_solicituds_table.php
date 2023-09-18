<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('solicitudes', function (Blueprint $table) {
            $table->id();
            $table->integer('numero');
            $table->unsignedBigInteger('tipo_id');
            $table->string('empresa');
            $table->string('rnc');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('status_id');
            $table->text('comentario');
            $table->string('status')->default(1);
            $table->timestamps();
            $table->foreign('tipo_id')->references('id')->on('tipo_solicitudes');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('status_id')->references('id')->on('estado_solicitudes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitudes');
    }
};
