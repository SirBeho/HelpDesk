<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    
            Schema::create('Tasks', function (Blueprint $table) {
                $table->id();
                $table->text('descripcion_detallada');
                
                $table->string('serial_number');
                $table->string('task_name');
                $table->date('date_finish');
                
                $table->unsignedBigInteger('priority');
                $table->unsignedBigInteger('task_type_id');
                $table->integer('estiamted_time');
                $table->date('real_time');
              
                $table->unsignedBigInteger('status_id');
                $table->timestamps();

                $table->foreign('priority')->references('id')->on('priorities');
                $table->foreign('task_type_id')->references('id')->on('TaskTypes');
                $table->foreign('status_id')->references('id')->on('Task_status');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Tasks');
    }
}
