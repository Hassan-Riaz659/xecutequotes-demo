<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuoteEmployeesTable extends Migration
{
    /**
     * The census members that are included in a quote.
     * `emp_id` is a client_employees row.
     */
    public function up()
    {
        Schema::create('quote_employees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quote_id')->constrained()->cascadeOnDelete();
            $table->foreignId('client_id')->constrained()->cascadeOnDelete();
            $table->foreignId('emp_id')->constrained('client_employees')->cascadeOnDelete();
            $table->timestamps();

            $table->index(['quote_id', 'emp_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('quote_employees');
    }
}
