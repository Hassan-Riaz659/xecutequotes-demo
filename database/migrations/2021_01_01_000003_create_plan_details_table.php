<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanDetailsTable extends Migration
{
    /**
     * Benefit summary of a plan for one carrier and year. plan_prices rows
     * are matched to it by (provider, year, plan_name).
     *
     * Benefit values are display strings ("$30", "20%", "N/A"), not numbers.
     */
    public function up()
    {
        Schema::create('plan_details', function (Blueprint $table) {
            $table->id();
            $table->string('provider', 50);
            $table->unsignedSmallInteger('year');
            $table->string('plan_name');
            $table->string('type', 20)->nullable();

            $table->string('deductible_individual_in_network', 50);
            $table->string('deductible_individual_out_network', 50)->nullable();
            $table->string('deductible_family_in_network', 50);
            $table->string('deductible_family_out_network', 50)->nullable();
            $table->string('out_of_pocket_max_individual_in_network', 50);
            $table->string('out_of_pocket_max_individual_out_network', 50)->nullable();
            $table->string('out_of_pocket_max_family_in_network', 50);
            $table->string('out_of_pocket_max_family_out_network', 50)->nullable();
            $table->string('hsa_compliant', 20)->nullable();

            $table->string('primary_care_office_visit', 120)->nullable();
            $table->string('preventive_care_services', 120)->nullable();
            $table->string('specialist_care_office_visit', 120)->nullable();
            $table->string('behavioral_health_visits', 120)->nullable();
            $table->string('urgent_care', 120)->nullable();
            $table->string('emergency_room', 120)->nullable();
            $table->string('ct_pet_scan_mri', 120)->nullable();
            $table->string('x_rays', 120)->nullable();
            $table->string('outpatient_hospital', 120)->nullable();
            $table->string('inpatient_hospital', 120)->nullable();
            $table->string('laboratory_tests', 120)->nullable();
            $table->string('chiropractic_and_acupuncture', 120)->nullable();
            $table->string('rehabilitation_therapy', 120)->nullable();

            $table->string('tier1', 120)->nullable()->comment('preferred generic drugs');
            $table->string('tier2', 120)->nullable()->comment('generic drugs');
            $table->string('tier3', 120)->nullable()->comment('brand name drugs');
            $table->string('tier4', 120)->nullable()->comment('non-preferred brand drugs');
            $table->string('tier5', 120)->nullable()->comment('preferred specialty drugs');
            $table->string('tier6', 120)->nullable()->comment('non-preferred specialty drugs');

            $table->timestamps();

            $table->unique(['provider', 'year', 'plan_name']);
            $table->foreign('provider')->references('name')->on('providers')->cascadeOnUpdate();
        });
    }

    public function down()
    {
        Schema::dropIfExists('plan_details');
    }
}
