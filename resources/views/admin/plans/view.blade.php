@extends('layouts.admin')

@section('content')
<!-- Container Fluid-->
        <div class="container-fluid" id="container-wrapper">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Plan Details</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="./">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Plan Details</li>
            </ol>
          </div>
          @if(Session::has('message'))
                 <p class="alert {{ Session::get('alert-class', 'alert-success') }}">{{ Session::get('message') }}</p>
            @endif
          <a href="{{ URL::previous() }}" class="btn btn-primary mb-2">Back</a>

          <div class="row mb-3">
            <div class="col-lg-12">
                <div class="card mb-12">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Plan Details</h6>
                    </div>
                    <div class="card-body">
                        <div class="row">
                                <input type="hidden" value="{{$plan->id}}" class="form-control" name="plan_id">
                                
                            <div class="col-md-6 col-md-offset-2 mt-2">
                            @if($plan->type == 0)
                              <h4 class="text-center">In-Network</h4>
                            @else
                            <h4 class="text-center">Out-Network</h4>
                            @endif
                              <div class="row mt-2">
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Name :</b></label>
                                      <span>{{$plan->name}}</span>
                                  </div>
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Individual Deductible :</b></label>
                                      <span>{{$plan->deductible_individual}}</span>
                                  </div>
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Family Deductible :</b></label>
                                      <span>{{$plan->deductible_family}}</span>
                                  </div>
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Out Of Pocket Maximum (Individual) :</b></label>
                                      <span>{{$plan->out_of_pocket_individual}}</span>
                                  </div>

                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Out Of Pocket Maximum (Family) :</b></label>
                                      <span>{{$plan->out_of_pocket_family}}</span>
                                  </div>
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>HSA Compliant :</b></label>
                                    @if($plan->out_of_pocket_family == 0)
                                      <span>No</span>
                                    @else
                                        <span>Yes</span>
                                    @endif
                                  </div>
                                  
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Preventitive Care Services :</b></label>
                                      <span>{{$plan->preventive_care_services}}</span>
                                  </div>
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Primary Care Office Visit :</b></label>
                                      <span>{{$plan->primary_care_office_visit}}</span>
                                  </div>
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Specialist Care Office Visit :</b></label>
                                      <span>{{$plan->specialist_care_office_visit}}</span>
                                  </div>
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Behavioral Health Visits :</b></label>
                                      <span>{{$plan->behavioral_health_visits}}</span>
                                  </div>
                                  
                                   <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Urgent Care :</b></label>
                                      <span>{{$plan->urgent_care}}</span>
                                  </div>
                                  
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Emergency Room :</b></label>
                                      <span>{{$plan->emergency_room}}</span>
                                  </div>
                                  
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>CT/PET Scan/MRI :</b></label>
                                      <span>{{$plan->ctpet_scan_mri}}</span>
                                  </div>
                                  
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>X-Rays :</b></label>
                                      <span>{{$plan->x_rays}}</span>
                                  </div>
                                  
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Laboratory Tests :</b></label>
                                      <span>{{$plan->laboratory_tests}}</span>
                                  </div>
                                  
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Outpatient Hospital :</b></label>
                                      <span>{{$plan->outpatient_hospital}}</span>
                                  </div>
                                    
                                    <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Inpatient Hospital :</b></label>
                                      <span>{{$plan->inpatient_hospital}}</span>
                                  </div>
                                  
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Chiropractic and Acupuncture :</b></label>
                                      <span>{{$plan->chiropractic_acupuncture}}</span>
                                  </div>
                                  
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Rehabiliation Therapy :</b></label>
                                      <span>{{$plan->rehabiliation_theory}}</span>
                                  </div>
                                  
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Tier 1 : Preferred Generic Drugs :</b></label>
                                      <span>{{$plan->tier_1_preferred_generic_drugs}}</span>
                                  </div>
                                  
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Tier 2 : Generic Drugs :</b></label>
                                      <span>{{$plan->tier_2_generic_drugs}}</span>
                                  </div>
                                  
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Tier 3 : Brand Name Drugs :</b></label>
                                      <span>{{$plan->tier_3_brand_name_drugs}}</span>
                                  </div>
                                  
                                  <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Tier 4 : Non-Pref Brand Drugs :</b></label>
                                      <span>{{$plan->tier_4_non_pref_brand_drugs}}</span>
                                  </div>
                                  
                                   <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Tier 5 : Pref Specialty Drugs :</b></label>
                                      <span>{{$plan->tier_5_pref_specialty_drugs}}</span>
                                  </div>
                                  
                                   <div class="col-md-12 row">
                                      <label for="individual_deductible" class="col-md-6"><b>Tier 6: Non-Pref Specialty Drugs :</b></label>
                                      <span>{{$plan->tier_6_non_pref_specialty_drugs}}</span>
                                  </div>

                              </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
          
            </div>
          </div>
          <!--Row-->

     
        </div>
        <!---Container Fluid-->
@endsection