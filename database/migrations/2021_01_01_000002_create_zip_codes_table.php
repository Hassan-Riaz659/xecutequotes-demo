<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateZipCodesTable extends Migration
{
    /**
     * Maps a zip code to the county each carrier prices it under
     * (one column per carrier; a carrier may not serve a zip).
     */
    public function up()
    {
        Schema::create('zip_codes', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('zip_code')->unique();
            $table->string('pres', 60)->nullable();
            $table->string('bcbs', 60)->nullable();
            $table->string('thnm', 60)->nullable();
            $table->string('friday', 60)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('zip_codes');
    }
}
