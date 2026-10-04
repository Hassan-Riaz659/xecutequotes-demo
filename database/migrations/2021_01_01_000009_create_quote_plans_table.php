<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuotePlansTable extends Migration
{
    /**
     * The plans a broker picked to compare for a quote. `chosen_plans` holds
     * the JSON array of plan_prices ids as text; the app compares the whole
     * string for equality, so it is not unique and not indexed.
     */
    public function up()
    {
        Schema::create('quote_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('client_id')->constrained()->cascadeOnDelete();
            $table->foreignId('quote_id')->constrained()->cascadeOnDelete();
            $table->text('chosen_plans');
            $table->timestamps();

            $table->index(['user_id', 'client_id', 'quote_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('quote_plans');
    }
}
