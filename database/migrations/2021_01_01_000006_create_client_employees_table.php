<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientEmployeesTable extends Migration
{
    /**
     * The census of a client: the employee plus spouse and dependents.
     * Removal is a manual soft delete: the app sets deleted_at and filters on it
     * (there is no SoftDeletes trait on the model).
     */
    public function up()
    {
        Schema::create('client_employees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->cascadeOnDelete();
            // 'Employee', 'Spouse' or 'Dependent'
            $table->string('member_type', 20);
            $table->string('f_name');
            $table->string('l_name');
            $table->date('dob')->nullable();
            $table->unsignedTinyInteger('age');
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();

            $table->index(['client_id', 'deleted_at']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('client_employees');
    }
}
