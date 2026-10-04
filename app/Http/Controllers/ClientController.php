<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Client;
use App\User;
use App\ClientEmployee;
use App\ZipCode;
use App\PlanPrice;
use App\PlanDetail;
use Response;
use App\Quote;
use App\QuoteEmployee;
use App\QuotePlan;
use App\SaveQuote;
use App\Services\Quote\AgeBracket;
use App\Services\Quote\PlanDetailsFormatter;
use App\Services\Quote\PlanPdfPrinter;
use App\Services\Quote\QuoteCensus;
use App\Services\Quote\QuoteLogo;
use App\Services\Quote\QuotePlanStore;
use App\Services\Quote\QuoteQuarter;
use App\Services\Quote\QuoteRecords;



class ClientController extends Controller{
    
    public function checkExistingClient($name){
        $flag = false;
        $clientExist = Client::where('name',$name)->where('user_id',auth()->id())->first();
        if($clientExist!=null)
        {
            $flag = true;
        }
        
        return Response::json(['status'=>$flag]);
    }
    
    public function viewClients($id)
    {
        $clients =  Client::where('user_id',$id)->orderBy('created_at', 'DESC')->get();
        
        if($clients!=null)
        {
            foreach($clients as $client)
            {
                $client['employees_count'] = ClientEmployee::where('client_id',$client['id'])->where('deleted_at',null)->count();
            }
        }
        
        return Response::json(['data'=>$clients]);
        
    }
    
    public function addClient(Request $request)
    {
        //check if user_id exist
        
        $flagExisting = false; 
        $client_id = null;
        $quote_user_id = null;
        $existing_employees =[];
        $client = Client::where('id',$request->clientId)->where('user_id',$request->userid)->first();
        $quoteDetails = '';
        $clientDetails = '';
      if($request->existing_client == "yes")
        {
            //plan assign also needs to be adjusted according to quote
            $quote = QuoteRecords::createQuote($request->clientId, $request->userid, $request->zip, $request->nickName, $request->date);
            $quoteDetails = $quote;
            
            $client_id = $request->clientId;
            $clientDetails = Client::findOrfail($client_id);
                
            $flagExisting = true;    
            $existing_employees = ClientEmployee::where('client_id',$request->clientId)->where('deleted_at',null)->get();
        }
        else{                
        if($client==null)
        {
            //add-client
            $client = new Client();
            $client->user_id = $request->userid;
            $client->name = $request->name;
            $client->zip = $request->zip;
            $client->effective_date = $request->date;
            $client->save();
            
            $clientDetails = $client;

            $client_id = $client->id;
           
            //plan assign also needs to be adjusted according to quote
            $quote = QuoteRecords::createQuote($client_id, $request->userid, $request->zip, $request->nickName, $request->date);
            $quoteDetails = $quote;
            
        }
        else
        {
            $client_id = $client['id'];
            $clientDetails = Client::findOrfail($client_id);
            //plan assign also needs to be adjusted according to quote
            $quote = QuoteRecords::createQuote($client_id, $request->userid, $request->zip, $request->nickName, $request->date);
            $quoteDetails = $quote;
            $quote_user_id = $quote->user_id;
        }
        }
        return Response::json(['data'=>$client_id,'quote'=>$quoteDetails,'flagExisting'=>$flagExisting,'existing_employees'=>$existing_employees,'user_id'=>$quote_user_id,'client_detail'=> $clientDetails]);
    }
    public function updateClient(Request $request)
    {
        $client_name = Client::findOrFail($request['clientId']);
        if($request['name'] != '')
        {
        $client_name->name = $request['name'];
        }
        else
        {
            $client_name->name = $request['ExistingName'];
        }
        $client_name->zip = $request['zip'];
        $client_name->effective_date = $request['date'];
        $client_name->save();
        
        $quote = Quote::findOrFail($request['quoteId']);
        $quote->zip = $request['zip'];
        $quote->nickName = $request['nickName'];
        $quote->effective_date = $request['date'];
        $quote->save();
        
        return Response::json(['flag'=>$client_name,'quote'=>$quote]);
    }
    
    
    public function existingClient($id)
    {
        
        $existingClInfo =  Client::where('id',$id)->first();
        $nickName = Quote::where('client_id',$id)->first();
        $existingClInfo['nickName'] = $nickName['nickName'];
        if($existingClInfo->effective_date == null)
        {
            $effective_date = Quote::where('client_id',$id)->first();
            $existingClInfo['effective_date'] = $effective_date->effective_date; 
        }
        return  Response::json(['existingClInfo'=>$existingClInfo]);
        
    }
    
    public function checkCredentialZip(Request $request){
            
            $flag1 = false;
            $zip = ZipCode::where('zip_code',$request->zip)->first();
            
             if($zip != null)
             {
                    $flag1 = true;                
             } 
            return Response::json(['status'=>$flag1]); 
		
    }
    
    public function checkCredentials(Request $request)
    {

        $flag = false;
        $clients = Client::where('user_id',auth()->id())->where('name',$request->name)->where('zip',$request->zip)->where('effective_date',$request->effective_date)->count();
        if($clients > 0)
        {
            $flag = true;
        }
        else
        {
            $flag = false;
        }
        return Response::json(['status'=>$flag]);
    }
    
    
    public function checkCredentialDate(Request $request)
    {
            $flag1 = false;
            
        
            //Our date.
            $dateStr = $request->ID;
             
            //Get the month number of the date
            //in question.
            $month = date("n", strtotime($dateStr));
            
            $year = date('Y', strtotime($dateStr));

            $quarter = QuoteQuarter::label($month);
            
            $planExistCheck = PlanPrice::where('year',$year)->where('quarter',$quarter)->first();
            
            if($planExistCheck!=null){
                  $flag1 = true;
                  return Response::json(['flag'=>$flag1]); 
            }
            else{
                return Response::json(['flag'=>$flag1]); 
            }

		}
    public function addEmployee(Request $request)
    {
        //first add all simple employee and all employees to db then go for existing employees.
        $client_id = $request->client_id;
        $quote_id = $request->quote_id;
        $all_employees = $request->all_employees; 
        $dependent_count = 0;
        foreach($all_employees as $employee)
        {
        
         if($employee['id'] == null && $employee['memberType'] !=null && $employee['fname'] !=null && $employee['lname'] != null && $employee['dob'] !=null && $employee['age'] !=null)
        {
            //new epmployee, so add only clientEmplpoyee and its emp_id in quote
            //dd($request->client_id,$employee['memberType'],$employee['fname'],$employee['lname'],$employee['dob'],$employee['age']);
            //echo'in not null';
            $employee1 = new ClientEmployee();
            $employee1->client_id = $client_id;
            $employee1->member_type = $employee['memberType'];
            $employee1->f_name = $employee['fname'];
            $employee1->l_name = $employee['lname'];
            $employee1->dob = $employee['dob'];
            $employee1->age = $employee['age'];
            $employee1->save();
            
          
            $employee_id = $employee1->id;
            if($employee['memberType'] == 'Dependent')
            {
              if($dependent_count < 3)
               {
                QuoteRecords::attachEmployee($client_id, $quote_id, $employee_id);
                $dependent_count++;
               }
               
            }
            else
            {
                QuoteRecords::attachEmployee($client_id, $quote_id, $employee_id); 
            }
        }
        else if($employee['id'] != null)
        {
            //this is existing epmployee, so add only emp id in quote
            //here check if member type is dependent and less than 3 other wise let it go.
            $MemberType = ClientEmployee::where('id',$employee['id'])->first();
            if($MemberType['member_type'] == 'Dependent')
            {
              if($dependent_count < 3)
               {
                QuoteRecords::attachEmployee($client_id, $quote_id, $employee['id']);
                $dependent_count++;
               }
            }
            else
            {
                QuoteRecords::attachEmployee($client_id, $quote_id, $employee['id']);
            }
            
        }
        }
       return Response::json(['data'=>1,'dependentCount'=>$dependent_count]);
    }
    
    public function getCalculatedEmployees($id,$user_id)
    {
        //after calculate button it comes here!
        $client = Client::where('id',$id)->first();
        /* decreasing credit limit*/
        
        $user=User::findOrFail($user_id);
        $actual_value = $user->credits_left;
        $bought_credits = $user->bought_credits;
        if($user['subscription_type'] == 'free'){
          
          if($bought_credits == null || $bought_credits == 0){
            
             if($actual_value!=null||$actual_value!=0){
                $quoteExist = QuoteRecords::latestForClient($client['id']);
                    if($quoteExist['is_complete']!=1)
                    {
                    $quoteObj = Quote::findOrFail($quoteExist['id']);
                    $quoteObj->is_complete = 1;
                    $quoteObj->is_free = 1;
                    $quoteObj->save();
                    
                    $user->credits_left = max(0, $actual_value-1);
                    $user->save();
                    }
        }
        }
        else
        {
            $quoteExist = QuoteRecords::latestForClient($client['id']);
                    if($quoteExist['is_complete']!=1)
                    {
                    $quoteObj = Quote::findOrFail($quoteExist['id']);
                    $quoteObj->is_complete = 1;
                    $quoteObj->save();
                    
                    $user->bought_credits = $bought_credits-1;
                    $user->save();
                    }
        }
        }
        $quote = QuoteRecords::latestForClient($client['id']);
        
        
        //Our date.
        $dateStr = $quote['effective_date'];
        //Get the month number of the date
        //in question.
         
        $month = date("n", strtotime($dateStr));
        
        $year = date('Y', strtotime($dateStr));
        
        $planExistCheck = PlanDetail::where('year',$year)->first();
        
        if($planExistCheck==null)
        {
            /* if no plan exist for this year */
            return Response::json(['data'=>2]);
        }
         
        $quarter = QuoteQuarter::label($month);
        
        $zipcodeExist = ZipCode::where('zip_code',(int)$quote['zip'])->first();
        if($zipcodeExist!=null)
        {
            $pres = $zipcodeExist['pres'];
            $bcbs = $zipcodeExist['bcbs'];
            $thnm = $zipcodeExist['thnm']; 
            $friday = $zipcodeExist['friday'];
            list($employees, $spouse_count, $dependent_count, $employee_count) = QuoteCensus::forQuote($quote['id']);

            $client['emp_count'] = sizeof($employees);
            $client['spouse_count'] =  $spouse_count;
            $client['dependent_count'] = $dependent_count;
            $client['employee_count'] = $employee_count;
            
            $age = $employees[0]['age'];
                $age = AgeBracket::standard($age, $year);
            $planpricing = [];
            
            $planpricing[0] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.county',$thnm)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.age',$age)->distinct()->get();
             
            foreach($planpricing[0] as $pricing)
            {
                $sum = null;
                foreach($employees as $emp)
                {
                    
                    $age = $emp['age'];
                    
                    $age = AgeBracket::standard($age, $year);
                    $planss = PlanPrice::where('provider',$pricing['provider'])->where('county',$pricing['county'])->where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('plan_prices.year',$year)->where('quarter',$quarter)->where('age',$age)->first();
                    $sum = $sum+floatval($planss['value']);
                }
                $sum = round($sum, 2);

                $pricing['monthly_premium'] = $sum;
                
                $pricing['plan_details'] = PlanDetail::where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('year',$year)->where('provider','THNM')->get();
                $pricing['checked'] = false;
            }
            
            $planpricing[1] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.county',$bcbs)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.age',$age)->distinct()->get();
            foreach($planpricing[1] as $pricing)
            {
                $sum = null;
                foreach($employees as $emp)
                {
                    
                    $age = $emp['age'];
                    
                    $age = AgeBracket::standard($age, $year);
                    $planss = PlanPrice::where('provider',$pricing['provider'])->where('county',$pricing['county'])->where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('plan_prices.year',$year)->where('quarter',$quarter)->where('age',$age)->first();
                    $sum = $sum+floatval($planss['value']);
                   
                }
                $sum = round($sum, 2);

                $pricing['monthly_premium'] = $sum;
                
                $pricing['plan_details'] = PlanDetail::where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('year',$year)->where('provider','BCBS')->get();
                //empty array
                $pricing['checked'] = false;
                
            }
            $planpricing[2] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.county',$friday)->where('plan_prices.provider','Friday')->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.age',$age)->distinct()->get();
             
            foreach($planpricing[2] as $pricing)
            {
                $sum = null;
                foreach($employees as $emp)
                {
                    
                    $age = $emp['age'];
                    
                    $age = AgeBracket::standard($age, $year);
                    $planss = PlanPrice::where('provider',$pricing['provider'])->where('county',$pricing['county'])->where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('plan_prices.year',$year)->where('quarter',$quarter)->where('age',$age)->first();
                    $sum = $sum+floatval($planss['value']);
                }
                $sum = round($sum, 2);

                $pricing['monthly_premium'] = $sum;
                
                $pricing['plan_details'] = PlanDetail::where('plan_name',$pricing['plan_name'])->where('year',$year)->where('provider','Friday')->get();
                
                $pricing['checked'] = false;
            }
            
                $age = AgeBracket::presbyterian($age, $year);
            
            $planpricing[3] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.county',$pres)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.age',$age)->distinct()->get();
           
            foreach($planpricing[3] as $pricing)
            {
                $sum = null;
                foreach($employees as $emp)
                {
                    $age = $emp['age'];
                    $age = AgeBracket::presbyterian($age, $year);
                    $planss = PlanPrice::where('provider',$pricing['provider'])->where('county',$pricing['county'])->where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('plan_prices.year',$year)->where('quarter',$quarter)->where('age',$age)->first();
                    
                    $sum = $sum+floatval($planss['value']);
                  
                }
                $sum = round($sum, 2);
                
                $pricing['monthly_premium'] = $sum;
                
                $pricing['plan_details'] = PlanDetail::where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('year',$year)->where('provider','Presbyterian')->get();
                $pricing['checked'] = false;
            }


            $planpricing[0] = $planpricing[0]->toArray();
            
            $planpricing[1] = $planpricing[1]->toArray();
            
            $planpricing[2] = $planpricing[2]->toArray();
            
            $planpricing[3] = $planpricing[3]->toArray();
            $result=array_merge($planpricing[0], $planpricing[1],$planpricing[2],$planpricing[3]);
            
            
           
            $user=User::findOrFail($client['user_id']);

            array_multisort( array_column($result, "monthly_premium"), SORT_ASC, $result);
          return Response::json(['data'=>1,'plans'=>$result,'client'=>$client,'msg'=>'success','user'=>$user]);
        }
        else
        {
            return Response::json(['data'=>0]);
        }
    }
    

    public function filterPlans(Request $request){
        
        if($request['mode'] == "ReAssignPlan")
        {
            $quote = Quote::where('id',$request['quote_id'])->first();
        }
        else
        {
        
        $client = Client::where('id',$request->id)->first();
        
        
        /* decreasing credit limit*/
        $user=User::findOrFail($client['user_id']);
        if($user['subscription_type'] == 'free'){
        $actual_value = $user->credits_left;
        if($actual_value!=null||$actual_value!=0){
            $user->credits_left = max(0, $actual_value-1);
            $user->save();
        }
        }
        $quote = QuoteRecords::latestForClient($client['id']);
        }
        
        
        //Our date.
        $dateStr = $quote['effective_date'];
        //Get the month number of the date
        //in question.
        $month = date("n", strtotime($dateStr));
        
        $year = date('Y', strtotime($dateStr));
        
        $planExistCheck = PlanDetail::where('year',$year)->first();
        if($planExistCheck==null)
        {
            
            /* if no plan exist for this year */
            return Response::json(['data'=>2]);
        }
         
        $quarter = QuoteQuarter::label($month);
        
        $zipcodeExist = ZipCode::where('zip_code',(int)$quote['zip'])->first();
        if($zipcodeExist!=null)
        {
            $pres = $zipcodeExist['pres'];
            $bcbs = $zipcodeExist['bcbs'];
            $thnm = $zipcodeExist['thnm'];
            $friday = $zipcodeExist['friday'];
            
            list($employees, $spouse_count, $dependent_count, $employee_count) = QuoteCensus::forQuote($quote['id']);
            $client['emp_count'] = sizeof($employees);
            $client['spouse_count'] =  $spouse_count;
            $client['dependent_count'] = $dependent_count;
            $client['employee_count'] = $employee_count;
            
            
            $age = $employees[0]['age'];
             
                $age = AgeBracket::standard($age, $year);
            $planpricing = [];
            $name = '';
            
            $sort_by_price = $request['sortByPrice'];
            $plan_types     = $request['selectedPlanType'];
            $metal_types    = $request['selectedMetalLevel'];
            $company_type  = $request['selectedCompanyType'];            
            
            $names = [];
            if($plan_types != null)
            {
                foreach($plan_types as $plan_type)
                {
                            if($metal_types == null)
                                {
                                    $name = $plan_type;
                                    array_push($names,$name);
                                }
                            else
                                {
                                    foreach($metal_types as $metal_type)
                                        {
                                            if($plan_type == "EPO")
                                                {
                                                    if($metal_type == null)
                                                    {
                                                        $name = $plan_type;
                                                    }
                                                    else
                                                    {
                                                    $name = $metal_type.' '.$plan_type;
                                                    }
                                                }
                                            else
                                                {
                                                    $name = $plan_type.' '.$metal_type;    
                                                }
                                                
                                                array_push($names,$name);
                                        }
                                }
                    }
            }
            else
            {
                foreach($metal_types as $metal_type)
                {
                            if($plan_types == null)
                                {
                                    $name = $metal_type;
                                    array_push($names,$name);
                                }
                            else
                                {
                                    foreach($plan_types as $plan_type)
                                        {
                                            if($plan_type == "EPO")
                                                {
                                                    if($metal_type == null)
                                                    {
                                                        $name = $plan_type;
                                                    }
                                                    else
                                                    {
                                                    $name = $metal_type.' '.$plan_type;
                                                    }
                                                }
                                            else
                                                {
                                                    $name = $plan_type.' '.$metal_type;    
                                                }
                                                
                                                array_push($names,$name);
                                        }
                                }
                    }
            }
        foreach($names as $name)
        {
            if($name!=''){
                if($company_type != null)
                {
                    $planpricing[0] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.provider',$company_type)->where('plan_prices.county',$bcbs)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.plan_name','like', '%' .$name. '%')->where('plan_prices.age',$age)->get();            
                }
                else
                {
                $planpricing[0] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.county',$bcbs)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.plan_name','like', '%' .$name. '%')->where('plan_prices.age',$age)->get();
                }//issue in age
            }else{
                if($company_type != null)
                {   
                    $planpricing[0] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.provider',$company_type)->where('plan_prices.county',$bcbs)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.plan_name','like', '%' .$name. '%')->where('plan_prices.age',$age)->get();            
                
                }
                else
                {
                $planpricing[0] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.county',$bcbs) ->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.plan_name','like', '%' .$name. '%')->where('plan_prices.age',$age)->get();
                }
            }
            
            foreach($planpricing[0] as $pricing)
            {
                $sum = null;
                foreach($employees as $emp)
                {
                    
                    $age = $emp['age'];
                    
                    $age = AgeBracket::standard($age, $year);
                    
                    $planss = PlanPrice::where('provider',$pricing['provider'])->where('county',$pricing['county'])->where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('plan_prices.year',$year)->where('quarter',$quarter)->where('age',$age)->first();
                    $sum = $sum+floatval($planss['value']);
                   
                }


                $sum = round($sum, 2);
                $pricing['monthly_premium'] = $sum;
                $pricing['plan_details'] = PlanDetail::where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('provider','BCBS')->get();
            }

            
            if($name!=''){
                if($company_type != null)
                {
                    
                    $planpricing[1] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.provider',$company_type)->where('plan_prices.county',$thnm)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.plan_name','like', '%' .$name. '%')->where('plan_prices.age',$age)->get();
                }
                else
                {
                $planpricing[1] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.county',$thnm)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.plan_name','like', '%' .$name. '%')->where('plan_prices.age',$age)->get();
                }
                
                }
                else
                {
                if($company_type != null)
                {
                    $planpricing[1] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.provider',$company_type)->where('plan_prices.county',$thnm)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.plan_name','like', '%' .$name. '%')->where('plan_prices.age',$age)->get();
                    
                }
                else
                {
                $planpricing[1] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.county',$thnm)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.plan_name','like', '%' .$name. '%')->where('plan_prices.age',$age)->get();
                }
                }
           

            foreach($planpricing[1] as $pricing)
            {
                $sum = null;
                foreach($employees as $emp)
                {
                    
                    $age = $emp['age'];
                    
                    $age = AgeBracket::standard($age, $year);
                    $planss = PlanPrice::where('provider',$pricing['provider'])->where('county',$pricing['county'])->where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('plan_prices.year',$year)->where('quarter',$quarter)->where('age',$age)->first();
                    $sum = $sum+floatval($planss['value']);
                 
                }
                $sum = round($sum, 2);
                $pricing['monthly_premium'] = $sum;
                
                $pricing['plan_details'] = PlanDetail::where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('provider','THNM')->get();
            }
            
            if($name!=''){
               if($company_type != null)
                {
                       $planpricing[2] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.provider',$company_type)->where('plan_prices.county',$friday)->where('plan_prices.provider','Friday')->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.plan_name','like', '%' .$name. '%')->where('plan_prices.age',$age)->get();           
                    
                }
                else
                {
                    $planpricing[2] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.county',$friday)->where('plan_prices.provider','Friday')->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.plan_name','like', '%' .$name. '%')->where('plan_prices.age',$age)->get();
                }

            }
            else{
                    if($company_type != null)
                    {
                       $planpricing[2] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.provider',$company_type)->where('plan_prices.county',$friday)->where('plan_prices.provider','Friday')->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.plan_name','like', '%' .$name. '%')->where('plan_prices.age',$age)->get();   
                    }
                    else
                    {
                        $planpricing[2] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.county',$friday)->where('plan_prices.provider','Friday')->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.plan_name','like', '%' .$name. '%')->where('plan_prices.age',$age)->get();
                    }

            }
            foreach($planpricing[2] as $pricing)
            {
                $sum = null;
                foreach($employees as $emp)
                {
                    $age = $emp['age'];
                    $age = AgeBracket::standard($age, $year);
                    $planss = PlanPrice::where('provider',$pricing['provider'])->where('county',$pricing['county'])->where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('plan_prices.year',$year)->where('quarter',$quarter)->where('age',$age)->first();
                    $sum = $sum+floatval($planss['value']);
                    
                      
                }
                $sum = round($sum, 2);
                       
                $pricing['monthly_premium'] = $sum;
                $pricing['plan_details'] = PlanDetail::where('plan_name',$pricing['plan_name'])->where('year',$year)->where('provider','Friday')->get();
                
            }
                
            
            $age = AgeBracket::presbyterian($age, $year);
            

            if($name!=''){
               if($company_type != null)
                {
                    $planpricing[3] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.provider',$company_type)->where('plan_prices.county',$pres)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.plan_name','like', '%' .$name. '%')->where('plan_prices.age',$age)->get();        
                }
                else
                {
                    $planpricing[3] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.county',$pres)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.plan_name','like', '%' .$name. '%')->where('plan_prices.age',$age)->get();
                }
                
            }else{
                if($company_type != null)
                {
                    $planpricing[3] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.provider',$company_type)->where('plan_prices.county',$pres)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.plan_name','like', '%' .$name. '%')->where('plan_prices.age',$age)->get();        
                }
                else
                {
                    $planpricing[3] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.county',$pres)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.plan_name','like', '%' .$name. '%')->where('plan_prices.age',$age)->get();
                }
            }
            foreach($planpricing[3] as $pricing)
            {
                $sum = null;
                foreach($employees as $emp)
                {
                    $age = $emp['age'];
                    $age = AgeBracket::presbyterian($age, $year);
                    $planss = PlanPrice::where('provider',$pricing['provider'])->where('county',$pricing['county'])->where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('plan_prices.year',$year)->where('quarter',$quarter)->where('age',$age)->first();
                    $sum = $sum+floatval($planss['value']);
                      
                }
                $sum = round($sum, 2);
                $pricing['monthly_premium'] = $sum;
                
                $pricing['plan_details'] = PlanDetail::where('plan_name','like','%' .$pricing['plan_name']. '%')->where('provider','Presbyterian')->get();
                
            }
        }
            
            
            
            $count = 0;
            $result=[];
            if($sort_by_price !=null){
                $planpricing[0] = $planpricing[0]->toArray();
                $planpricing[1] = $planpricing[1]->toArray();
                $planpricing[2] = $planpricing[2]->toArray();
                $planpricing[3] = $planpricing[3]->toArray();
                $result=array_merge($planpricing[0], $planpricing[1],$planpricing[2],$planpricing[3]);
                if($sort_by_price=='htl'){
                    array_multisort( array_column($result, "monthly_premium"), SORT_DESC, $result);

                }else{
                    array_multisort( array_column($result, "monthly_premium"), SORT_ASC, $result);
                }
                $count = 1;
            }else{
        
                $planpricing[0] = $planpricing[0]->toArray();
                $planpricing[1] = $planpricing[1]->toArray();
                $planpricing[2] = $planpricing[2]->toArray();
                $planpricing[3] = $planpricing[3]->toArray();
                $result=array_merge($planpricing[0], $planpricing[1],$planpricing[2],$planpricing[3]);
                array_multisort( array_column($result, "monthly_premium"), SORT_ASC, $result);

                $count = 1;
            }
            if($count==1){
                
                return Response::json(['data'=>1,'plans'=>$result,'client'=>$client,'msg'=>'success']);
            }
        }
        else
        {
            return Response::json(['data'=>0]);
        }
    }

    public function changeCensus($id)
    {
        $client = Client::where('id',$id)->first();
        $quote = QuoteRecords::latestForClientOfUser($client['user_id'], $id);
        $quote_employees = QuoteEmployee::where('quote_id',$quote['id'])->get();
        $employees = [];
        foreach($quote_employees as $quote_employee)
        {
            $clientEmployee = ClientEmployee::where('id',$quote_employee['emp_id'])->first();
            array_push($employees,$clientEmployee);
        }
        return Response::json(['employees'=>$employees,'quote_id'=>$quote['id'],'client_id'=>$id]);
    }
    
    public function getDateCensus($id)
    {
        $client = Client::where('id',$id)->first();
        $quote = QuoteRecords::latestForClientOfUser($client['user_id'], $id);
        $date = $quote['effective_date'];
        return Response::json(['date'=>$date]);
    }
    
    public function addCensusEmp(Request $request)
    {
        $client = Client::where('id',$request->client_id)->first();
        
        $employee = new ClientEmployee();
        $employee->client_id = $request->client_id;
        $employee->member_type = $request->member_type;
        $employee->f_name = $request->fName;
        $employee->l_name = $request->lName;
        $employee->dob = $request->dob;
        $employee->age = $request->age;
        $employee->save();
            
          
        $employee_id = $employee->id;
        $quote = QuoteRecords::latestForClientOfUser($client['user_id'], $request->client_id);
           
        QuoteRecords::attachEmployee($request->client_id, $quote['id'], $employee_id);
        return Response::json(['success'=>true]);
    }
    
    public function comparePlans(Request $request)
    {
        $plans = [];
        $logo = '';
        $last_quote = '';
        $recheck_plan = $request[0]['recheckPlan'];
        $array= [];
        $quotePlansId = '';
        $chosenplans = '';
        $check_quote_plan ='';
        if($recheck_plan == true)
        {
        
        $last_quote = $request[0]['quoteId'];
        $recheckPlanClientId = $request[0]['clientId'];
        
            $array = $request[0]['array'];
           
            $array2 = $request[0]['array'];
            $client = Client::where('id',$recheckPlanClientId)->first();
            $user_id = $client->user_id;
            
            $chosenplans = QuotePlan::where('client_id',$recheckPlanClientId)->where('quote_id',$last_quote)->first();
            $quotePlansId = $chosenplans;  
            $encoded = json_encode($array2);
            $chosenplans->chosen_plans = $encoded;
            $chosenplans->save();
        } 
        else
        {
        $requestObj = $request->all();
        $array = $requestObj[0]['array'];
        
        $array2 = $requestObj[0]['array'];
        
        $client = Client::where('id',$requestObj[1])->first();
        $user_id = $client->user_id;
       
        $last_quote = Quote::where('client_id',$client->id)->where('user_id',$user_id)->max('id');
        
        $encodedArray = json_encode($array2);
        
        $check_quote_plan = QuotePlanStore::ensureForQuote($user_id, $client['id'], $last_quote, $encodedArray);
        $quotePlansId = $check_quote_plan;
        }
        $image = User::where('id',$user_id)->first();
        $plan_name = '';
        
        $logo = QuoteLogo::forQuote($last_quote, $image, $logo);
        

        if($chosenplans == null)
        {
            $Quote_plan_info  = QuotePlan::where('user_id',$user_id)->where('client_id',$client['id'])->where('quote_id',$last_quote)->first();
            $quotePlansId = $Quote_plan_info;    
        }

        
        $quote = QuoteRecords::latestForClient($client['id']);
        
        $dateStr = $quote['effective_date'];    
        $quoteEmployees  = QuoteEmployee::where('quote_id',$quote['id'])->get();
        $year = date('Y', strtotime($dateStr));
        $i = 0;
         
        foreach($array as $arr)
        {   
            $sum = null;
            $planObj = PlanPrice::where('id',$arr)->first();
            
            $plans[$i] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.id',$arr)->first();
            
         $employees = [];
          foreach($quoteEmployees as $quoteEmployee)  
            {
                $emp = ClientEmployee::select('f_name','l_name','age','dob','member_type')->where('id',$quoteEmployee['emp_id'])->first();
                array_push($employees,$emp);
                //if client asks for all dependents then in clientEmployee table add new field quote id and get client employees against that quote id only.
            }
            foreach($employees as $emp)
            {
                  if($planObj['provider'] == 'Presbyterian')
                  {  
                    $age = $emp['age'];
                    
                        $age = AgeBracket::presbyterian($age, $year);
                      
                  }
                  else
                  {
                    $age = $emp['age'];
                    
                        $age = AgeBracket::standard($age, $year);
                          
                  }                    
                    $plan = PlanPrice::where('plan_name',$planObj['plan_name'])->where('year',$planObj['year'])->where('quarter',$planObj['quarter'])->where('provider',$planObj['provider'])->where('county',$planObj['county'])->where('age',$age)->first();
                     $plan_name = $plan['plan_name'];
                    //add name field in plan object
                    
                    $plan_name = PlanDetailsFormatter::tier($plan_name);
                    $emp['pricing'] = $plan['value'];
                    
                    $emp['pricing'] = round($emp['pricing'], 3);
                    $emp['pricing'] =  number_format($emp['pricing'], 2);
                 

                    $sum = $sum+floatval($plan['value']);
                  
            }
            $sum = round($sum, 3);
            $sum =  number_format($sum, 2);       
            
            
            
             $plans[$i]['plan_tier'] = $plan_name;
             $plans[$i]['monthly_premium'] = $sum;
             $plans[$i]['plan_details'] = PlanDetail::where('provider',$planObj['provider'])->where('year',$planObj['year'])->where('plan_name',$planObj['plan_name'])->first();
             
             PlanDetailsFormatter::applyNetworkAmounts($plans[$i]);
             
             $plans[$i]['employees'] = $employees;
           
             /*Applying checks on these fields if their values are numbers or percenatages */
             PlanDetailsFormatter::prefixDollar($plans[$i]);
             
             $i++;
        }
        
        if($logo != '')
        {
        return Response::json(['data'=>$plans,'logo'=>$logo,'user_id'=>$user_id,'client_id'=>$client['id'],'last_quote'=>$last_quote,'quotePlansInfo'=>$quotePlansId]);
        }
        else
        {
        return Response::json(['data'=>$plans,'user_id'=>$user_id,'client_id'=>$client['id'],'last_quote'=>$last_quote,'quotePlansInfo'=>$quotePlansId]);
            
        }
        
    }
    
    public function getSavedQuote($id)
    {
        $savedQuotes  = SaveQuote::where('user_id',$id)->get();
        foreach($savedQuotes as $savedQuote)
        {
          $ClientName = Client::where('id',$savedQuote->client_id)->first();  
          $quote = Quote::where('id',$savedQuote->quote_id)->first();  
          $savedQuote['client'] = $ClientName['name'];  
          $savedQuote['zip'] = $quote['zip'];  
          $savedQuote['nickName'] = $quote['nickName'];  
          $savedQuote['effective_date'] = $quote['effective_date'];  
          $savedQuote['assigned_plan'] = $quote['plan_assign'];  
          $savedQuote['created_at'] = $quote['created_at'];  
          
        }

        return Response::json(['savedQuotes'=>$savedQuotes]);
    }
    
    public function saveQuote(Request $request)
    {
        $quote = SaveQuote::where('user_id',$request->user_id)->where('client_id',$request->client_id)->where('quote_id',$request->quote_id)->first();
        if($quote == null){
        
        $saveQuote = new SaveQuote();
        $saveQuote->user_id = $request->user_id;
        $saveQuote->client_id = $request->client_id;
        $saveQuote->quote_id = $request->quote_id;
        $saveQuote->quote_plans_id = $request->quote_plans_id;
        $saveQuote->save();
        return Response::json(['success'=>'success']);
        }
        else
        {
           if($quote['quote_plans_id'] != $request->quote_plans_id)
           { 
            $quote = SaveQuote::where('user_id',$request->user_id)->where('client_id',$request->client_id)->where('quote_id',$request->quote_id)->first();
            $quote->quote_plans_id = $request->quote_plans_id;
            $quote->save();
            return Response::json(['success'=>'success']);
           }
           else
           { 
            return Response::json(['success'=>'Already saved']);
           }
        }
    }
    
    public function seeComparedPlansPrint(Request $request)
    {
        $records = QuotePlan::where('quote_id',$request[1])->first();
        $array = json_decode($records['chosen_plans']);
          
          
        
        $plans = [];
        $logo = '';
        
        $client = Client::where('id',$records['client_id'])->first();
        $user_id = $client->user_id;
        
        $client_name = $client['name'];
        
         $last_quote = Quote::where('client_id',$client->id)->where('user_id',$user_id)->max('id');
        
        $image = User::where('id',$user_id)->first();
        
        $plan_name = '';
        
        $logo = QuoteLogo::forQuote($last_quote, $image, $logo);

        
        $quote = Quote::where('id',$request[1])->first();
        $dateStr = $quote['effective_date'];
        $quoteEmployees  = QuoteEmployee::where('quote_id',$request[1])->get();
        $year = date('Y', strtotime($dateStr));
        $i = 0;
        foreach($array as $arr)
        {
            $sum = null;
            $planObj = PlanPrice::where('id',$arr)->first();
            
            $plans[$i] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.id',$arr)->first();
         $employees = [];
          foreach($quoteEmployees as $quoteEmployee)  
            {
                $emp = ClientEmployee::select('f_name','l_name','age','dob','member_type')->where('id',$quoteEmployee['emp_id'])->first();
                if($emp->member_type == "Employee")
                {
                    $emp->member_type = "E";
                }
                else if($emp->member_type == "Spouse")
                {
                    $emp->member_type = "S";
                }else
                {
                    $emp->member_type = "D";
                }
                array_push($employees,$emp);
            }
            foreach($employees as $emp)
            {
                    
                   if($planObj['provider'] == 'Presbyterian')
                  {  
                    $age = $emp['age'];
                    
                        $age = AgeBracket::presbyterian($age, $year);
                      
                  }
                  else
                  {
                    $age = $emp['age'];
                    
                        $age = AgeBracket::standard($age, $year);
                          
                  }
                    
                    $plan = PlanPrice::where('plan_name',$planObj['plan_name'])->where('year',$year)->where('quarter',$planObj['quarter'])->where('provider',$planObj['provider'])->where('county',$planObj['county'])->where('age',$age)->first();
                     $plan_name = $plan['plan_name'];
                     
                     
                    //add name field in plan objwct
                    $plan_name = PlanDetailsFormatter::tier($plan_name);
                    $emp['pricing'] = $plan['value'];
    
                    $sum = $sum+floatval($plan['value']);
            }
            $sum = round($sum, 3);
            $sum =  number_format($sum, 2);
            
             $plans[$i]['plan_tier'] = $plan_name;
             $plans[$i]['monthly_premium'] = $sum;
             $plans[$i]['plan_details'] = PlanDetail::where('provider',$planObj['provider'])->where('year',$planObj['year'])->where('plan_name',$planObj['plan_name'])->first();
             
                PlanDetailsFormatter::applyNetworkAmounts($plans[$i]);
             
             $plans[$i]['employees'] = $employees;
            
             PlanDetailsFormatter::prefixDollar($plans[$i], true);
             
             
             $i++;
        }
        
        $str = rand();
        
        $employeeRates = $request[0];
        PlanPdfPrinter::save($plans, $logo, $client_name, $employeeRates, $str);
       
        
        return Response::json(['data'=>PlanPdfPrinter::url($client_name, $str)]);



    }
    
    
    public function printPlans(Request $request)
    {
          $requestObj = $request->all();
          $employeeRates = $request[2];
          
        $array = $requestObj[0]['array'];
        $array2 = $requestObj[0]['array'];
        
        $plans = [];
        $logo = '';
        
        $client = Client::where('id',$requestObj[1])->first();
        $user_id = $client->user_id;
        
        $client_name = $client['name'];
        
        $last_quote = Quote::where('client_id',$client->id)->where('user_id',$user_id)->max('id');
        $encodedArray = json_encode($array2);
        
        QuotePlanStore::ensureForChosenPlans($user_id, $client['id'], $last_quote, $encodedArray);
        
        $image = User::where('id',$user_id)->first();
        
        $plan_name = '';
        
        $logo = QuoteLogo::forQuote($last_quote, $image, $logo);
        
        $quote = QuoteRecords::latestForClient($client['id']);
        $dateStr = $quote['effective_date'];
        $quoteEmployees  = QuoteEmployee::where('quote_id',$quote['id'])->get();
        
        $year = date('Y', strtotime($dateStr));
        $i = 0;
        foreach($array as $arr)
        {
            $sum = null;
            $planObj = PlanPrice::where('id',$arr)->first();
            
            $plans[$i] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.id',$arr)->first();
         $employees = [];
          foreach($quoteEmployees as $quoteEmployee)  
            {
                $emp = ClientEmployee::select('f_name','l_name','age','dob','member_type')->where('id',$quoteEmployee['emp_id'])->first();
                
                if($emp->member_type == "Employee")
                {
                    $emp->member_type = "E";
                }
                else if($emp->member_type == "Spouse")
                {
                    $emp->member_type = "S";
                }else
                {
                    $emp->member_type = "D";
                }
                array_push($employees,$emp);
            }
            foreach($employees as $emp)
            {
                    
                   if($planObj['provider'] == 'Presbyterian')
                  {  
                    $age = $emp['age'];
                    
                        $age = AgeBracket::presbyterian($age, $year);
                      
                  }
                  else
                  {
                    $age = $emp['age'];
                    
                        $age = AgeBracket::standard($age, $year);
                          
                  }
                    
                    $plan = PlanPrice::where('plan_name',$planObj['plan_name'])->where('year',$year)->where('quarter',$planObj['quarter'])->where('provider',$planObj['provider'])->where('county',$planObj['county'])->where('age',$age)->first();
                     $plan_name = $plan['plan_name'];
                     
                     
                    //add name field in plan objwct
                    $plan_name = PlanDetailsFormatter::tier($plan_name);
                    $emp['pricing'] = $plan['value'];
    
                    $sum = $sum+floatval($plan['value']);
            }
            $sum = round($sum, 3);
            $sum =  number_format($sum, 2);
            
             $plans[$i]['plan_tier'] = $plan_name;
             $plans[$i]['monthly_premium'] = $sum;
             $plans[$i]['plan_details'] = PlanDetail::where('provider',$planObj['provider'])->where('year',$planObj['year'])->where('plan_name',$planObj['plan_name'])->first();
             
                PlanDetailsFormatter::applyNetworkAmounts($plans[$i]);
             
             $plans[$i]['employees'] = $employees;
            
             PlanDetailsFormatter::prefixDollar($plans[$i], true);
             
             
             $i++;
        }
        
        
        $str = rand();
        
        
        
        PlanPdfPrinter::save($plans, $logo, $client_name, $employeeRates, $str);
       

        
         return Response::json(['data'=>PlanPdfPrinter::url($client_name, $str)]);
    
     
    
    }
    
    public function assignPlan(Request $request){
        
        
        $client = Client::findOrFail($request->client_id);
        $last_quote = Quote::where('client_id',$client->id)->max('id');
        $quote = Quote::where('id',$last_quote)->first();
        $quote->plan_assign = $request->plan_id;
        $quote->save();
        $client->plan_assigned = $request->plan_id;
        $client->save();
        
        return 'success';
    }
    public function removeChosenPlans(Request $request)
    {
        $quote_plan = QuotePlan::where('user_id',$request->user_id)->where('client_id',$request->client_id)->where("quote_id",$request->quote_id)->first();
        $quote_plan->delete();
        return Response::json(['delete'=>1]);
    }
    
    public function emptyEmployeeRow($id)
    {
        
        $quoteEmployee = QuoteEmployee::where('quote_id',$id)->get();
        foreach($quoteEmployee as $quoteEmployees)
        {
            $totalAppearences =  QuoteEmployee::where('emp_id',$quoteEmployees['emp_id'])->get();
             if ($totalAppearences->count() >= 2)
             {
                $quoteEmployees->delete();     
             }
             else
             {
                ClientEmployee::where('id',$quoteEmployees->emp_id)->delete();
                $quoteEmployees->delete();                   
             }

        }

        
        return Response::json(['delete'=>1]);
    }

    public function seeComparedPlans($id)
    {

        $records = QuotePlan::where('quote_id',$id)->first();
        
        $array = json_decode($records['chosen_plans']);
        
        
        
        $plans = [];
        $logo = '';
        
        $client = Client::where('id',$records['client_id'])->first();
        $user_id = $records['user_id'];
       
        $last_quote = Quote::where('id',$id)->first();
       
        $chosenplans = QuotePlan::where('client_id',$records['client_id'])->where('quote_id',$id)->first();
        $quotePlansId = $chosenplans;  
       
        $image = User::where('id',$user_id)->first();
        $plan_name = '';
        $logo = QuoteLogo::companyLogo($image, $logo);
        $quote = Quote::where('id',$id)->first();
        $dateStr = $quote['effective_date'];
        $quoteEmployees  = QuoteEmployee::where('quote_id',$quote['id'])->get();
        
        $year = date('Y', strtotime($dateStr));
        $i = 0;
        foreach($array as $arr)
        {   
            $sum = null;
            $planObj = PlanPrice::where('id',$arr)->first();
            
            $plans[$i] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.id',$arr)->first();
            
         $employees = [];
          foreach($quoteEmployees as $quoteEmployee)  
            {
                $emp = ClientEmployee::select('f_name','l_name','age','dob','member_type')->where('id',$quoteEmployee['emp_id'])->first();
                array_push($employees,$emp);
            }
            foreach($employees as $emp)
            {
                  if($planObj['provider'] == 'Presbyterian')
                  {  
                    $age = $emp['age'];
                    
                        $age = AgeBracket::presbyterian($age, $year);
                      
                  }
                  else
                  {
                    $age = $emp['age'];
                    
                        $age = AgeBracket::standard($age, $year);
                          
                  }                    
                    $plan = PlanPrice::where('plan_name',$planObj['plan_name'])->where('year',$planObj['year'])->where('quarter',$planObj['quarter'])->where('provider',$planObj['provider'])->where('county',$planObj['county'])->where('age',$age)->first();
                                  
                     $plan_name = $plan['plan_name'];
                    //add name field in plan object
                    
                    $plan_name = PlanDetailsFormatter::tier($plan_name);
                    $emp['pricing'] = $plan['value'];
                    
                    $emp['pricing'] = round($emp['pricing'], 3);
                    $emp['pricing'] =  number_format($emp['pricing'], 2);
                 
                    
                    $sum = $sum+floatval($plan['value']);
                  
            }
            $sum = round($sum, 3);
            $sum =  number_format($sum, 2);       

            
             $plans[$i]['plan_tier'] = $plan_name;
             $plans[$i]['monthly_premium'] = $sum;
             $plans[$i]['plan_details'] = PlanDetail::where('provider',$planObj['provider'])->where('year',$planObj['year'])->where('plan_name',$planObj['plan_name'])->first();
             
             PlanDetailsFormatter::applyNetworkAmounts($plans[$i]);
             
             $plans[$i]['employees'] = $employees;
           
             /*Applying checks on these fields if their values are numbers or percenatages */
             PlanDetailsFormatter::prefixDollar($plans[$i]);
             
             $i++;
        }
        
        if($logo != '')
        {
        return Response::json(['data'=>$plans,'logo'=>$logo,'user_id'=>$user_id,'client_id'=>$client['id'],'last_quote'=>$last_quote,'quotePlansInfo'=>$quotePlansId]);
        }
        else    
        {
        return Response::json(['data'=>$plans,'user_id'=>$user_id,'client_id'=>$client['id'],'last_quote'=>$last_quote,'quotePlansInfo'=>$quotePlansId]);
        }
    }
    
}