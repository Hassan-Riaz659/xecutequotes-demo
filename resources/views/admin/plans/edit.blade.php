@extends('layouts.admin')

@section('content')
<!-- Container Fluid-->
        <div class="container-fluid" id="container-wrapper">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Edit Plan</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="./">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Edit Plan</li>
            </ol>
          </div>
          @if(Session::has('message'))
                 <p class="alert {{ Session::get('alert-class', 'alert-success') }}">{{ Session::get('message') }}</p>
            @endif
          <a href="{{ URL::previous() }}" class="btn btn-primary mb-2">Back</a>
          <form method="post" action="{{url('update-plan-details')}}">
              @csrf
          <div class="row mb-3">
            <div class="col-lg-12">
                <div class="card mb-12">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Edit Plan</h6>
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
                                  <div class="col-md-12">
                                      <label for="individual_deductible">Name</label>
                                      <input type="text" class="form-control" value="{{$plan->name}}" name="name" required>
                                  </div>
                                  <div class="col-md-12">
                                      <label for="individual_deductible">Individual Deductible</label>
                                      <input type="text" class="form-control" value="{{$plan->deductible_individual}}" name="individual_deductible" required>
                                  </div>
                                  <div class="col-md-12">
                                      <label for="family_deductible">Family Deductible</label>
                                      <input type="text" class="form-control" value="{{$plan->deductible_family}}" name="family_deductible" required>
                                  </div>
                                  <div class="col-md-12">
                                      <label for="out_of_pocket_max_individual">Out Of Pocket Maximum (Individual)</label>
                                      <input type="text" class="form-control" value="{{$plan->out_of_pocket_individual}}" name="out_of_pocket_max_individual" required>
                                  </div>
                                  <div class="col-md-12">
                                      <label for="out_of_pocket_max_family">Out Of Pocket Maximum (Family)</label>
                                      <input type="text" class="form-control" value="{{$plan->out_of_pocket_family}}" name="out_of_pocket_max_family" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="hsa_compliant">HSA Compliant</label>
                                      <select class="form-control" name="hsa_compliant">
                                          <option value="1">Yes</option>
                                          <option value="0">No</option>
                                      </select>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="preventitive_care_services">Preventitive Care Services</label>
                                      <input type="text" class="form-control" value="{{$plan->preventive_care_services}}" name="preventitive_care_services" required>
                                  </div>
                                  <div class="col-md-12">
                                      <label for="primary_care_office_visit">Primary Care Office Visit</label>
                                      <input type="text" class="form-control" value="{{$plan->primary_care_office_visit}}" name="primary_care_office_visit" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="specialist_care_office_visit">Specialist Care Office Visit</label>
                                      <input type="text" class="form-control" value="{{$plan->specialist_care_office_visit}}" name="specialist_care_office_visit" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="behavioral_health_visits">Behavioral Health Visits</label>
                                      <input type="text" class="form-control" value="{{$plan->behavioral_health_visits}}" name="behavioral_health_visits" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="urgent_care">Urgent Care</label>
                                      <input type="text" class="form-control" value="{{$plan->urgent_care}}" name="urgent_care" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="emergency_room">Emergency Room</label>
                                      <input type="text" class="form-control" value="{{$plan->emergency_room}}" name="emergency_room" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="ct_pet_scan_mri">CT/PET Scan/MRI</label>
                                      <input type="text" class="form-control" value="{{$plan->ctpet_scan_mri}}" name="ct_pet_scan_mri" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="x_rays">X-Rays</label>
                                      <input type="text" class="form-control" value="{{$plan->x_rays}}" name="x_rays" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="laboratory_tests">Laboratory Tests</label>
                                      <input type="text" class="form-control" value="{{$plan->laboratory_tests}}" name="laboratory_tests" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="outpatient_hospital">Outpatient Hospital</label>
                                      <input type="text" class="form-control" value="{{$plan->outpatient_hospital}}" name="outpatient_hospital" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="inpatient_hospital">Inpatient Hospital</label>
                                      <input type="text" class="form-control" value="{{$plan->inpatient_hospital}}" name="inpatient_hospital" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="chiropractic_acupuncutre">Chiropractic and Acupuncture</label>
                                      <input type="text" class="form-control" value="{{$plan->chiropractic_acupuncture}}" name="chiropractic_acupuncutre" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="rehabilitation_therapy">Rehabiliation Therapy</label>
                                      <input type="text" class="form-control" value="{{$plan->rehabiliation_theory}}" name="rehabilitation_therapy" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="tier_1_preferred_generic_drugs">Tier 1: Preferred Generic Drugs</label>
                                      <input type="text" class="form-control" value="{{$plan->tier_1_preferred_generic_drugs}}" name="tier_1_preferred_generic_drugs" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="tier_2_generic_drugs">Tier 2: Generic Drugs</label>
                                      <input type="text" class="form-control" value="{{$plan->tier_2_generic_drugs}}" name="tier_2_generic_drugs" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="tier_3_brand_name_drugs">Tier 3: Brand Name Drugs</label>
                                      <input type="text" class="form-control" value="{{$plan->tier_3_brand_name_drugs}}" name="tier_3_brand_name_drugs" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="tier_4_non_pref_brand_drugs">Tier 4: Non-Pref Brand Drugs</label>
                                      <input type="text" class="form-control" value="{{$plan->tier_4_non_pref_brand_drugs}}" name="tier_4_non_pref_brand_drugs" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="tier_5_pref_specialty_drugs">Tier 5: Pref Specialty Drugs</label>
                                      <input type="text" class="form-control" value="{{$plan->tier_5_pref_specialty_drugs}}" name="tier_5_pref_specialty_drugs" required>
                                  </div>
                                  
                                  <div class="col-md-12">
                                      <label for="tier_6_non_pref_specialty_drugs">Tier 6: Non-Pref Specialty Drugs</label>
                                      <input type="text" class="form-control" value="{{$plan->tier_6_non_pref_specialty_drugs}}" name="tier_6_non_pref_specialty_drugs" required>  
                                  </div>
                              </div>
                            </div>
                 
                            
                            <div class="col-md-12 mt-2 pull-right">
                                      <input type="submit" class="btn btn-success" value="Update">
                                  </div>
                           
                        </div>
                    </div>
                </div>
          
            </div>
          </div>
          </form>
          <!--Row-->

     
        </div>
        <!---Container Fluid-->
@endsection