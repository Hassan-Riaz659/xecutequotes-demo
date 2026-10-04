<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSaveQuotesTable extends Migration
{
    /**
     * A quote a broker saved, pointing at the set of compared plans
     * (quote_plans) that was saved with it.
     */
    public function up()
    {
        Schema::create('save_quotes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('client_id')->constrained()->cascadeOnDelete();
            $table->foreignId('quote_id')->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('quote_plans_id')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'client_id', 'quote_id']);
            $table->foreign('quote_plans_id')->references('id')->on('quote_plans')->nullOnDelete();
        });
    }

    public function down()
    {
        Schema::dropIfExists('save_quotes');
    }
}
