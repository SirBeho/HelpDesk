<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransitionStatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transition_status', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('state_from_id');
            $table->unsignedBigInteger('state_to_id');
            $table->foreign('state_from_id')->references('id')->on('Task_status');
            $table->foreign('state_to_id')->references('id')->on('Task_status');
            $table->integer('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transition_status');
    }
}
