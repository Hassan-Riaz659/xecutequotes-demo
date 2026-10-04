<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * A broker's client (an employer group that gets quoted).
     * The effective date may be empty: the app then reads it from the quote.
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('zip', 10);
            $table->date('effective_date')->nullable();
            // The plan_prices row the broker assigned to this client.
            $table->unsignedBigInteger('plan_assigned')->nullable();
            $table->timestamps();

            $table->index(['name', 'zip', 'effective_date']);
            $table->foreign('plan_assigned')->references('id')->on('plan_prices')->nullOnDelete();
        });
    }

    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
