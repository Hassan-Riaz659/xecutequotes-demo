<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Company;
use App\Plan;
use Session;

class PlanController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function addPlan(Request $request)
    {
        /* company id */
        $id = $request->id;
        return view('admin.plans.create',compact('id'));
    }
    
    public function managePlans(Request $request)
    {
        $plans = Plan::where('company_id',$request->id)->get();
        $company = Company::where('id',$request->id)->first();
        return view('admin.plans.manage',compact('plans','company'));
    }
    
    public function addPlanDetails(Request $request)
    {
        $plan = new Plan();
        $plan->name=$request->name;
        $plan->company_id=$request->company_id;
        $plan->deductible_individual=$request->individual_deductible;
        $plan->deductible_family=$request->family_deductible;
        $plan->out_of_pocket_individual=$request->out_of_pocket_max_individual;
        $plan->out_of_pocket_family=$request->out_of_pocket_max_family;
        $plan->hsa_compliant=$request->hsa_compliant;
        $plan->preventive_care_services=$request->preventitive_care_services;
        $plan->primary_care_office_visit=$request->primary_care_office_visit;
        $plan->specialist_care_office_visit=$request->specialist_care_office_visit;
        $plan->behavioral_health_visits=$request->behavioral_health_visits;
        $plan->urgent_care=$request->urgent_care;
        $plan->emergency_room=$request->emergency_room;
        $plan->ctpet_scan_mri=$request->ct_pet_scan_mri;
        $plan->x_rays=$request->x_rays;
        $plan->laboratory_tests=$request->laboratory_tests;
        $plan->outpatient_hospital=$request->outpatient_hospital;
        $plan->inpatient_hospital=$request->inpatient_hospital;
        $plan->chiropractic_acupuncture=$request->chiropractic_acupuncutre;
        $plan->rehabiliation_theory=$request->rehabilitation_therapy;
        $plan->tier_1_preferred_generic_drugs=$request->tier_1_preferred_generic_drugs;
        $plan->tier_2_generic_drugs=$request->tier_2_generic_drugs;
        $plan->tier_3_brand_name_drugs=$request->tier_3_brand_name_drugs;
        $plan->tier_4_non_pref_brand_drugs=$request->tier_4_non_pref_brand_drugs;
        $plan->tier_5_pref_specialty_drugs=$request->tier_5_pref_specialty_drugs;
        $plan->tier_6_non_pref_specialty_drugs=$request->tier_6_non_pref_specialty_drugs;
        $plan->type=0;
        $plan->save();
        
        
        $plan_out = new Plan();
        $plan_out->name=$request->name;
        $plan_out->company_id=$request->company_id;
        $plan_out->deductible_individual=$request->individual_deductible_out;
        $plan_out->deductible_family=$request->family_deductible_out;
        $plan_out->out_of_pocket_individual=$request->out_of_pocket_max_individual_out;
        $plan_out->out_of_pocket_family=$request->out_of_pocket_max_family_out;
        $plan_out->hsa_compliant=$request->hsa_compliant_out;
        $plan_out->preventive_care_services=$request->preventitive_care_services_out;
        $plan_out->primary_care_office_visit=$request->primary_care_office_visit_out;
        $plan_out->specialist_care_office_visit=$request->specialist_care_office_visit_out;
        $plan_out->behavioral_health_visits=$request->behavioral_health_visits_out;
        $plan_out->urgent_care=$request->urgent_care_out;
        $plan_out->emergency_room=$request->emergency_room_out;
        $plan_out->ctpet_scan_mri=$request->ct_pet_scan_mri_out;
        $plan_out->x_rays=$request->x_rays_out;
        $plan_out->laboratory_tests=$request->laboratory_tests_out;
        $plan_out->outpatient_hospital=$request->outpatient_hospital_out;
        $plan_out->inpatient_hospital=$request->inpatient_hospital_out;
        $plan_out->chiropractic_acupuncture=$request->chiropractic_acupuncutre_out;
        $plan_out->rehabiliation_theory=$request->rehabilitation_therapy_out;
        $plan_out->tier_1_preferred_generic_drugs=$request->tier_1_preferred_generic_drugs_out;
        $plan_out->tier_2_generic_drugs=$request->tier_2_generic_drugs_out;
        $plan_out->tier_3_brand_name_drugs=$request->tier_3_brand_name_drugs_out;
        $plan_out->tier_4_non_pref_brand_drugs=$request->tier_4_non_pref_brand_drugs_out;
        $plan_out->tier_5_pref_specialty_drugs=$request->tier_5_pref_specialty_drugs_out;
        $plan_out->tier_6_non_pref_specialty_drugs=$request->tier_6_non_pref_specialty_drugs_out;
        $plan_out->type=1;
        $plan_out->save();
        
        Session::flash('message', 'Record added successfully!'); 
        Session::flash('alert-class', 'alert-success');
        return back();
    }
    
    public function editPlan($id)
    {
        $plan=Plan::where('id',$id)->first();
        return view('admin.plans.edit',compact('plan'));
    }
    
    public function updatePlanDetails(Request $request)
    {
        Plan::where('id',$request->plan_id)->update([
            
                "name" => $request->name,
                "deductible_individual" => $request->individual_deductible,
                "deductible_family" => $request->family_deductible,
                "out_of_pocket_individual" => $request->out_of_pocket_max_individual,
                "out_of_pocket_family" => $request->out_of_pocket_max_family,
                "hsa_compliant" => $request->hsa_compliant,
                "preventive_care_services" => $request->preventitive_care_services,
                "primary_care_office_visit" => $request->primary_care_office_visit,
                "specialist_care_office_visit" => $request->specialist_care_office_visit,
                "behavioral_health_visits" => $request->behavioral_health_visits,
                "urgent_care" => $request->urgent_care,
                "emergency_room" => $request->emergency_room,
                "ctpet_scan_mri" => $request->ct_pet_scan_mri,
                "x_rays" => $request->x_rays,
                "laboratory_tests" => $request->laboratory_tests,
                "outpatient_hospital" => $request->outpatient_hospital,
                "inpatient_hospital" => $request->inpatient_hospital,
                "chiropractic_acupuncture" => $request->chiropractic_acupuncutre,
                "rehabiliation_theory" => $request->rehabilitation_therapy,
                "tier_1_preferred_generic_drugs" => $request->tier_1_preferred_generic_drugs,
                "tier_2_generic_drugs" => $request->tier_2_generic_drugs,
                "tier_3_brand_name_drugs" => $request->tier_3_brand_name_drugs,
                "tier_4_non_pref_brand_drugs" => $request->tier_4_non_pref_brand_drugs,
                "tier_5_pref_specialty_drugs" => $request->tier_5_pref_specialty_drugs,
                "tier_6_non_pref_specialty_drugs" => $request->tier_6_non_pref_specialty_drugs,
            ]);
            
        Session::flash('message', 'Record updated successfully!'); 
        Session::flash('alert-class', 'alert-success');
        return back();
    }
    
    public function viewPlan($id)
    {
        $plan=Plan::where('id',$id)->first();
        return view('admin.plans.view',compact('plan'));
    }
    

}
