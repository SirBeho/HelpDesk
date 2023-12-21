<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskTypeSkillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_type_skills', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('task_type_id');
            $table->unsignedBigInteger('skill_id');
            $table->foreign('task_type_id')->references('id')->on('task_types');
            $table->foreign('skill_id')->references('id')->on('skills');
            $table->integer('skill_level');
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
        Schema::dropIfExists('task_type_skills');
    }
}
