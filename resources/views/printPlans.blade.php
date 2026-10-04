<!DOCTYPE html>
<html>
<head>
<title>Compared Plans</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="{{ \App\Services\Quote\PlanPdfPrinter::asset('public/public/assets/css/bootstrap.min.css') }}">

<style> 
.page-break {
    page-break-after: auto;

}
.page-break-rates{
    page-break-before: always;
}
.body {
    position: relative;
    width: 100%;
    display: block;
    clear: both;
}
.label {
    position: absolute;
     top: 0;
     bottom: 0px;
     height: 100%;
     overflow: hidden;
     left: 0px;
}


.label:nth-of-type(2) {
    display: none;
}
.label:nth-of-type(3) {
    display: none;
}
.label:nth-of-type(4) {
    display: none;
}
.label:nth-of-type(5) {
    display: none;
}
.label h5 {
    height: 17px;
   
    border-bottom: 1px solid #e3e6f0;
}
.label h6 {
    height: 17px;
   
    border-bottom: 1px solid #e3e6f0;
}

.test{
   float: left;
    display:inline-block;
    width: 150px;
    position: relative;
    height: 830px;
    overflow: hidden;
    margin-bottom: 200px;
}
.test:nth-of-type(1) {
     
     position: absolute;
     top: 0;
     bottom: 0px;
     height: 100%;
    left: 150px;
    margin-left: 160px;
      height: 830px;
    overflow: hidden;
}
.test:nth-of-type(2) {
     
     position: absolute;
     top: 0;
     bottom: 0px;
     height: 100%;
     left: 300px;
     overflow: hidden;
      
      height: 830px;
    overflow: hidden;
}
.test:nth-of-type(3) {
     
     position: absolute;
     top: 0;
     bottom: 0px;
     height: 100%;
     right: 320px;
        height: 830px;
     overflow: hidden;
     
}
.test:nth-of-type(4) {
     
     position: absolute;
     top: 0;
     bottom: 0px;
     right: 160px;
     height: 830px;
     overflow: hidden;
     
}
.test:nth-of-type(5) {
     
     position: absolute;
     top: 0;
     bottom: 0px;
     
    height: 830px;
    overflow: hidden;
   
     
}

.label p {
    margin-bottom: 0px;
    width: 100%;
    font-size: 10px;
    border-bottom: 1px solid #e3e6f0;
    display: block;
    height: 17px;
    margin-left: 0px;
    padding-bottom: 2px;
    padding-top: 2.1px !important;
   
   
}

.label p:nth-of-type(1) {
    height: 30px important;
    padding 2px 10px 3;
}
.label p:last-child {
    height: 30px important;
    
}

p {
    margin-bottom: 0px;
    width: 100%;
    font-size: 10px;
    display: block;
    margin-top: 0px;
    margin-left: -10px;
    height: 17px;
    padding-top: 3px ;
    padding-bottom: 2px;
    
    
    width: 100%;
    
}

p:nth-of-type(1) {

    height: 30px;
    padding 2px 10px 3px;
}

p:nth-of-type(4) {

   
    font-size: 10px;
    padding-top: 2px;
    padding-bottom: 1px;
    width: 100%;
    margin-bottom: 0px;
    height: 17px;
}
p:nth-of-type(7) {

   
    font-size: 10px;
    padding-top: 2px;
    padding-bottom: 1px;
    width: 100%;
    margin-bottom: 0px;
    height: 17px;
}
p:nth-of-type(24) {

   
    font-size: 10px;
    padding-top: 2px;
    padding-bottom: 1px;
    width: 100%;
    margin-bottom: 0px;
    height: 21px;
}


h5 {
        font-size: 9px;
    padding-top: 2px;
    padding-bottom: 0px;
    width: 100%;
    margin-bottom: 0px;
    height: 9px;
 
}
h6 {
        font-size: 9px;
    padding-top: 2px;
    padding-bottom: 0px;
    width: 100%;
    margin-bottom: 0px;
    height: 9px;
   
}

.pdf-logo {
    position: absolute;
    top: 5px;
    left: 0px;
    z-index: 9999;
    display: inline-block;
    width: 200px;
    height: 50px;
    background-color: #fff;
    
}
.pdf-logo img {
width: 150px;
height: 75px;

}
 #watermark {
    position: fixed;
    top: 50%;
    width: 100%;
    text-align: center;
    opacity: .6;
    transform: rotate(-10deg);
    transform-origin: 50% 50%;
    z-index: -1000;
    color:blue;
    font-size:2rem;
     
 }
  
   #watermark2 {
    position: fixed;
    top: 10%;
    width: 100%;
    text-align: center;
    opacity: .6;
    transform: rotate(-10deg);
    transform-origin: 50% 50%;
    z-index: -1000;
    color:blue;
    font-size:2rem;
    margin-left:-0.2rem;
  }

</style></head>
<body >
    <h3 style="position: absolute: left: 0px;color: #000;font-size: 13px;right: 0px;text-align: center;top: 0px;margin-top:0px;margin-bottom: 0px">{{$client_name}}</h3>
    <div class="row body">
        
        
          @foreach($plans as $plan)<div class="label"> @if($logo != "No Image")<span class="pdf-logo"><img  src="{{ \App\Services\Quote\PlanPdfPrinter::asset("public/images/companies_logos/$logo") }}"/>
          
          </span> @else <span>No Image found</span>  @endif <p style="padding-top: 5px"></p>
          <div id="watermark" style = {{$logo == 'xecute_logo.jpg' ? ' display:block' : ' display:none' }}>
            Created By xecutequotes.com
          </div>    
          <p></p>
          <p></p>
          <h5>Deductibles</h5>
          <p>Individual</p>
          <p>Family</p>
          <h5>Out of Pocket Maximum</h5>
          <p>Individual</p>
          <p> Family</p>
          <p>H.S.A Complaint</p>
          <p>Preventive Care Services</p>
          <p>Primary Care Office Visit</p>
          <p>Specialist Care Office Visit</p>
          <p>Behavioral Health Visits</p>
          <p>Urgent Care</p>
          <p>Emergency Room</p>
          <p>CT/PET/SCAN/MRI</p>
          <p>X Rays</p>
          <p> Laboratory Tests</p>
          <p>Outpatient Hospital</p>
          <p>Inpatient Hospital</p>
          <p>Chiropractic & Acupuncture</p>
          <p>Rehabilitation Therapy</p>
          <p>Prescriptions</p>
          <p>Tier 1:Preffered Generic Drugs</p>
          <p>Tier 2:Generic Drugs </p>
          <p>Tier 3:Brand Name Drugs</p>
          <p>Tier 4: Non Preffered Brand Drugs</p>
          <p>Tier 5:Pref Specialty Drugs</p>
          <p>Tier 6:Non-Pref Specialty Drugs</p>
          <p><b>TOTAL Monthly Premium</b></p>
         
          </div>
          <div class="col-md-3 test">
              <p>
                  <img className="table-logos-img img-fluid" style="width:80px;height:auto" src="{{ \App\Services\Quote\PlanPdfPrinter::asset("public/images/$plan->logo") }}"/></p>
              <p>{{$plan->plan_name}}</p>
              <p>{{$plan->plan_tier}}</p>
              <p></p>
              <p>${{$plan->deductible_in}}</p>
              <p>${{$plan->family_in}}</p>
              <p></p>
              <p>${{$plan->max_individual_in}}</p>
              <p>${{$plan->max_family_in}}</p>
              <p>{{ ucfirst($plan->plan_details->hsa_compliant) !='' ? ucfirst($plan->plan_details->hsa_compliant) : '' }}</p>
              <p>{{ucfirst($plan->plan_details->preventive_care_services)}}</p>
              <p>{{ucfirst($plan->plan_details->primary_care_office_visit)}}</p>
              <p>{{ucfirst($plan->plan_details->specialist_care_office_visit)}}</p>
              <p>{{ucfirst($plan->plan_details->behavioral_health_visits)}}</p>
              <p>{{ucfirst($plan->plan_details->urgent_care)}}</p>
              <p>{{ucfirst($plan->plan_details->emergency_room)}}</p>
              <p>{{ucfirst($plan->plan_details->ct_pet_scan_mri)}}</p>
              <p>{{ucfirst($plan->plan_details->x_rays)}}</p>
              <p>{{ucfirst($plan->plan_details->laboratory_tests)}}</p>
              <p>{{ucfirst($plan->plan_details->outpatient_hospital)}}</p>
              <p>{{ucfirst($plan->plan_details->inpatient_hospital)}}</p>
              <p>{{ucfirst($plan->plan_details->chiropractic_and_acupuncture)}}</p>
              <p>{{ucfirst($plan->plan_details->rehabilitation_therapy)}}</p>
              <p></p>
              <p>{{ucfirst($plan->plan_details->tier1)}}</p>
              <p>{{ucfirst($plan->plan_details->tier2)}}</p>
              <p>{{ucfirst($plan->plan_details->tier3)}}</p>
              <p>{{ucfirst($plan->plan_details->tier4)}}</p>
              <p>{{ucfirst($plan->plan_details->tier5)}}</p>
              <p>{{ucfirst($plan->plan_details->tier6)}}</p>
              <p><b>${{$plan->monthly_premium}}</b></p>
              
              </div> 
             
             @if($loop->iteration%5===0)
             
              </div>
               
              <div class="row body page-break">
             
             @endif  
             
             @endforeach 
             
             </div>
             
                @if($employeeRates =='yes')
                <div class="page-break-rates">
                    <div class="row body">
                        @foreach($plans as $plan)
                        <div class="label">

                            <div id="watermark2" style = {{$logo == 'xecute_logo.jpg' ? ' display:block' : ' display:none'}}>
                                Created By xecutequotes.com
                            </div>    
                            <p><b>Carrier</b></p>
                            <p><b>Plan Name</b></p>
                            <p><b>Monthly Premium</b></p>
                            <p><b>List Rate</b></p>
                        </div>
                        <div class="col-md-3 test">
                            
                            <p><img className="table-logos-img img-fluid" style="width:80px;height:auto" src="{{ \App\Services\Quote\PlanPdfPrinter::asset("public/images/$plan->logo") }}"/></p>
                            <p>{{$plan->plan_name}}</p>
                            <p>${{$plan->monthly_premium}}</p>
                            <p style="text-decoration: underline; -webkit-text-decoration-color:#e3e6f0;text-decoration-color:#e3e6f0;">@foreach($plan->employees as $employee)
                            <span class="d-block"> <b>>></b>{{$employee->member_type}} {{$employee->f_name}}{{$employee->l_name}} - {{$employee->pricing}}</span>
                            @endforeach
                            </p>
                            
                        </div>
                         @if($loop->iteration%5===0 && $plan->plan_name != null)
             
                        </div>
               
                        <div class="row body page-break"> @endif  @endforeach </div>
                    </div>
                </div>
                @endif
                
              </body>
              </html>