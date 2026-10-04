<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuotesTable extends Migration
{
    /**
     * A quote run for a client. `plan_assign` is the plan_prices row the
     * broker finally assigned; `is_free` marks a quote that used a free credit.
     */
    public function up()
    {
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('zip', 10)->nullable();
            $table->string('nickName')->nullable();
            $table->date('effective_date');
            $table->unsignedBigInteger('plan_assign')->nullable();
            $table->boolean('is_complete')->default(false);
            $table->boolean('is_free')->default(false);
            $table->timestamps();

            $table->index(['user_id', 'created_at']);
            $table->foreign('plan_assign')->references('id')->on('plan_prices')->nullOnDelete();
        });
    }

    public function down()
    {
        Schema::dropIfExists('quotes');
    }
}
