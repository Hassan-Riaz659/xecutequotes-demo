<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLicensedEmployeesTable extends Migration
{
    /**
     * The licensed employees (agents) a broker added. Each one also has a
     * user row (role 3) in `user_id`. `charge_id` is the payment whose extra
     * license was used, empty when no paid license was left.
     */
    public function up()
    {
        Schema::create('licensed_employees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('broker_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('charge_id')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone_no', 55)->nullable();
            $table->timestamps();

            $table->index('email');
            $table->foreign('charge_id')->references('id')->on('charges')->nullOnDelete();
        });
    }

    public function down()
    {
        Schema::dropIfExists('licensed_employees');
    }
}
