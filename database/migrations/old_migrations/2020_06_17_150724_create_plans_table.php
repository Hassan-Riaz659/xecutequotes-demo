<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('company_id');
            $table->string('deductible_individual');
            $table->string('deductible_family');
            $table->string('out_of_pocket_individual');
            $table->string('out_of_pocket_family');
            $table->string('hsa_compliant');
            $table->string('preventive_care_services');
            $table->string('primary_care_office_visit');
            $table->string('specialist_care_office_visit');
            $table->string('behavioral_health_visits');
            $table->string('urgent_care');
            $table->string('emergency_room');
            $table->string('ctpet_scan_mri');
            $table->string('x_rays');
            $table->string('laboratory_tests');
            $table->string('outpatient_hospital');
            $table->string('inpatient_hospital');
            $table->string('chiropractic_acupuncture');
            $table->string('rehabiliation_theory');
            $table->string('tier_1_preferred_generic_drugs');
            $table->string('tier_2_generic_drugs');
            $table->string('tier_3_brand_name_drugs');
            $table->string('tier_4_non_pref_brand_drugs');
            $table->string('tier_5_pref_specialty_drugs');
            $table->string('tier_6_non_pref_specialty_drugs');
            $table->tinyInteger('type');
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
        Schema::dropIfExists('plans');
    }
}
