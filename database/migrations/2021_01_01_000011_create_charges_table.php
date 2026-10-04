<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChargesTable extends Migration
{
    /**
     * One row per payment: the annual subscription, its renewals, bought
     * credit packages and extra licenses. Only the last four digits of the
     * card are stored (never the full number or the CVV).
     */
    public function up()
    {
        Schema::create('charges', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            // Payment gateway reference of the transaction.
            $table->string('retref');
            $table->decimal('amount', 10, 2);
            $table->string('card_num', 4);
            $table->string('exp_month', 10);
            $table->string('exp_year', 10);
            // Set when the payment bought credits / licenses.
            $table->unsignedInteger('bought_credits')->nullable();
            $table->unsignedInteger('total_additional_licenses')->default(0);
            $table->unsignedInteger('additional_licenses_left')->default(0);
            $table->date('next_charge_date')->nullable();
            $table->unsignedTinyInteger('status')->default(1);
            $table->timestamps();

            $table->index('next_charge_date');
        });
    }

    public function down()
    {
        Schema::dropIfExists('charges');
    }
}
