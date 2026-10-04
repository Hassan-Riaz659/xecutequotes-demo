<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanPricesTable extends Migration
{
    /**
     * Monthly premium of a plan per carrier, year, quarter, county and age.
     *
     * `age` is a label rather than a number: single ages as text ("0".."63"),
     * "64+", and for 2021 also the "0-14" and "21-24" brackets.
     * `quarter` is "1st".."4th".
     */
    public function up()
    {
        Schema::create('plan_prices', function (Blueprint $table) {
            $table->id();
            $table->string('provider', 50);
            $table->unsignedSmallInteger('year');
            $table->string('quarter', 4);
            $table->string('county', 60);
            $table->string('plan_name');
            $table->string('age', 8);
            $table->decimal('value', 10, 2);
            $table->timestamps();

            // Lookup used for every price: carrier + year + quarter + county + age.
            $table->index(['provider', 'year', 'quarter', 'county', 'age'], 'plan_prices_lookup_index');
            $table->foreign('provider')->references('name')->on('providers')->cascadeOnUpdate();
        });
    }

    public function down()
    {
        Schema::dropIfExists('plan_prices');
    }
}
