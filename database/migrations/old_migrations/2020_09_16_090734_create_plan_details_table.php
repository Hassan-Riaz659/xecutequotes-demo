<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plan_details', function (Blueprint $table) {
            $table->id();
            $table->string('provider');
            $table->string('plan_name');
            $table->string('type');
            $table->integer('year');
            $table->string('deductible_individual_in_network');
            $table->string('deductible_individual_out_network')->nullable();
            $table->string('deductible_family_in_network');
            $table->string('deductible_family_out_network')->nullable();
            $table->string('out_of_pocket_max_individual_in_network');
            $table->string('out_of_pocket_max_family_out_network')->nullable();
            $table->string('hsa_compliant')->nullable();
            $table->string('preventive_care_services')->nullable();
            $table->string('primary_care_office_visit')->nullable();
            $table->string('specialist_care_office_visit')->nullable();
            $table->string('behavioral_health_visits')->nullable();
            $table->string('urgent_care')->nullable();
            $table->string('emergency_room')->nullable();
            $table->string('ct_pet_scan_mri')->nullable();
            $table->string('x_rays')->nullable();
            $table->string('laboratory_tests')->nullable();
            $table->string('outpatient_hospital')->nullable();
            $table->string('inpatient_hospital')->nullable();
            $table->string('chiropractic_and_acupuncture')->nullable();
            $table->string('rehabilitation_therapy')->nullable();
            $table->string('tier1')->comment('preferred_generic_drugs')->nullable();
            $table->string('tier2')->comment('generic_drugs')->nullable();
            $table->string('tier3')->comment('brand_name_drugs')->nullable();
            $table->string('tier4')->comment('non_pref_brand_drugs')->nullable();
            $table->string('tier5')->comment('pref_specialty_drugs')->nullable();
            $table->string('tier6')->comment('non_pref_specialty_drugs')->nullable();
            
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
        Schema::dropIfExists('plan_details');
    }
}
