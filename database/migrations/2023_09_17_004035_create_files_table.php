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
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('referencia')->unique();
            $table->string('nombre');
            $table->string('tipo');
            $table->boolean('confidencial')->default(false);
            $table->unsignedBigInteger('emisor_id');
            $table->unsignedBigInteger('receptor_id');
            $table->timestamps();
            $table->foreign('emisor_id')->references('id')->on('users');
            $table->foreign('receptor_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
