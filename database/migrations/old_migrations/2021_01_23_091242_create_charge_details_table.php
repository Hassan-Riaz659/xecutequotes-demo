<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChargeDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('charge_details', function (Blueprint $table) {
            $table->id();
            $table->string('unique_charge_id');
            $table->unsignedInteger('charge_id');
            $table->string('amount');
            $table->string('user_id')->comment('charge_for');
            $table->string('charge_type')->default('subscription');
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
        Schema::dropIfExists('charge_details');
    }
}
