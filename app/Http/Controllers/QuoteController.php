<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ZipCode;
use App\Client;
use App\User;
use Response;
use App\PlanPrice;
use App\PlanDetail;
use App\ClientEmployee;
use Carbon\Carbon;
use App\Quote;
use App\QuoteEmployee;
class QuoteController extends Controller
{
    
    public function checkQuote(Request $request)
    {
        
        $quarter = null;
        
        //Our date.
        $dateStr = $request->date;
         
        //Get the month number of the date
        //in question.
        $month = date("n", strtotime($dateStr));
        
        $year = date('Y', strtotime($dateStr));
        
        $yearQuarter = ceil($month / 3);
        
        $quarter = null;

        if($yearQuarter==1.0)
        {
            $quarter = '1st';
        }
        else if($yearQuarter==2.0)
        {
            $quarter = '2nd';
        }
        else if($yearQuarter==3.0)
        {
            $quarter = '3rd';
        }
        else
        {
            $quarter = '4th';
        }
        
        $dateExistCheck = PlanPrice::where('year', $year)->where('quarter', $quarter)->first();
        if($dateExistCheck==null)
            
         
        //Divide that month number by 3 and round up
        //using ceil.
        
        
        $zipcodeExist = ZipCode::where('zip_code',(int)$request('zip'))->first();
        if($zipcodeExist!=null)
        {
            
            return Response::json(['flag'=>1]);
        }else{
            return Response::json(['flag'=>0]);
        }
        
    }
    public function quotes($id)
    {
        
     $quotes =  Client::where('user_id',$id)->get();
     $total_clients =  Client::where('user_id',$id)->count();
        
     return  Response::json(['data'=>$quotes,'total_clients'=>$total_clients]);
    }
    
    public function client($id)
    {   
        
         $client =  Client::where('id',$id)->first();
         
         if($client->effective_date == null)
         {
             $effective_date = Quote::where('client_id',$id)->first();
                
             $client->effective_date = $effective_date->effective_date;
             $client->nickName = $effective_date->nickName;
         }
         else
         {
            $nickName = Quote::where('client_id',$id)->first();
            $client->nickName = $nickName->nickName;
         }
         
         return  Response::json(['clientDetails'=>$client]);
    }
    
    public function previousQuotes($id)
    {
     $quotes =  Quote::where('user_id',$id)->orderBy('created_at', 'DESC')->get();
     $logo1='';
     
     foreach($quotes as $quote)
     {
       $client_name =  Client::where('id',$quote->client_id)->first();
       $user_id = $client_name['user_id'];
       $logo = User::where('id',$user_id)->first();
       $logo1 = $logo['company_logo'];
       $quote['client'] = $client_name['name'];
       $dating = Carbon::parse($quote['effective_date']);
       $dating = $dating->format('d-m-Y');
       $quote['effective_date'] = $dating;
         
       if($quote->plan_assign != null)
       {
       $assigned_plan  = PlanPrice::where('id',$quote->plan_assign)->first();
       $quote['assigned_plan'] = $assigned_plan['plan_name']; 
       }
       
           
       }   
     return  Response::json(['quotes'=>$quotes,'logo'=>$logo1]);
    
    }
    
    public function quotes30Days($id)
    {
        $last =  date('Y-m-d', strtotime(Carbon::now()->subDays(30)));
  
        $quotes =  Quote::where('user_id',$id)->whereDate('created_at', '>',$last)->get();
         
        if($quotes!=null)
        {
            foreach($quotes as $quote)
            {
                $client_name = Client::where('id',$quote['client_id'])->first();
                $quote['clientName'] = $client_name['name'];
            
            }
        }
        

        return  Response::json(['quotes'=>$quotes]);
    
    }
    
    public function totalquotes30Days($id)
    {   
        $last =  date('Y-m-d', strtotime(Carbon::now()->subDays(30)));
    
        $time =  Carbon::parse($last);
        
        
        $previousMonth =  date('Y-m-d', strtotime($time->subDays(30)));
        
        $previousMonthQuotes =  Quote::where('user_id',$id)->whereDate('created_at','>',$previousMonth)->whereDate('created_at', '<',$last)->count();
        
        
        //totalQuotes30days percentage

        $totalQuotes30days =  Quote::where('user_id',$id)->whereDate('created_at', '>',$last)->count(); 
        $percentageForQuotes = $totalQuotes30days - $previousMonthQuotes;
        $percentageForQuotes = ($percentageForQuotes / $previousMonthQuotes)*100;
        $percentageForQuotes =  number_format((float)$percentageForQuotes, 2, '.', '');
        
        //totalClients30days percentage

        $previousMonthClients =  Client::where('user_id',$id)->whereDate('created_at','>',$previousMonth)->whereDate('created_at', '<',$last)->count();

        $totalClients30days =  Client::where('user_id',$id)->whereDate('created_at', '>',$last)->count(); 
        $percentageForClients = $totalClients30days - $previousMonthClients;
        $percentageForClients = ($percentageForClients / $previousMonthClients)*100;
        $percentageForClients =  number_format((float)$percentageForClients, 2, '.', '');
        
        
        

        //last client's details
        $last_client_details =  Client::where('user_id',$id)->orderBy('id', 'desc')->first();
       
        
        //totalQuotes all time;
        $totalclients =  Client::where('user_id',$id)->count(); 
        
        //last quote  
        $last_quote = Quote::where('user_id',$id)->orderBy('id','DESC')->first();
         //last_client's name
        $last_client_name = Client::where('id',$last_quote['client_id'])->first();
        
        return  Response::json(['totalQuotes30days'=>$totalQuotes30days,'last_client_details'=>$last_client_details,'totalclients'=>$totalclients,'lastQuot'=>$last_quote,'lastClientName'=>$last_client_name['name'],"percentageForQuotes"=>$percentageForQuotes,"percentageForClients"=>$percentageForClients]);

    }
    
    public function lastClientDetails($id)
    {

        $quote = Quote::where('user_id',$id)->orderBy('id','desc')->first();

        if($quote == null)
        {
            //account without quotes: the answer PHP 7.2 gave (nulls and empty lists); newer PHP versions raise an error instead
            return  Response::json(['lastQuote'=>null,'employees'=>[],'client'=>null,'plan_assigned'=>'']);
        }

        //if plans is assigned
        $plan_assigned ='';
        if($quote['plan_assign'] != null)
        {
        $get_plan  = PlanPrice::where('id',$quote->plan_assign)->first();
        $plan_assigned = $get_plan['plan_name'];
        }
        
        //get all employees of the quote    
        $employees = QuoteEmployee::where('quote_id',$quote['id'])->get();
        
        $client = '';
        //if employees exist
        
        
        $client = Client::where('id',$quote['client_id'])->first();
       
        $quoteEmployees = [];
        foreach($employees as $employee)
        {
        $allEmployees = ClientEmployee::where('id',$employee->emp_id)->first();
        array_push($quoteEmployees,$allEmployees); 
        }
        
         return  Response::json(['lastQuote'=>$quote,'employees'=>$quoteEmployees,'client'=>$client,'plan_assigned'=>$plan_assigned]);
    }
    public function resetQuotePlans($id,$quoteId)
    {
        //after calculate button it comes here!
        $planss = [];
        $client = Client::where('id',$id)->first();
        /* decreasing credit limit*/
        
        $user=User::findOrFail($client['user_id']);
       

        $quote = Quote::where('id',$quoteId)->first();
        
        $quarter = null;
        
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
         
        //Divide that month number by 3 and round up
        //using ceil.
        $yearQuarter = ceil($month / 3);

        if($yearQuarter==1.0)
        {
            $quarter = '1st';
        }
        else if($yearQuarter==2.0)
        {
            $quarter = '2nd';
        }
        else if($yearQuarter==3.0)
        {
            $quarter = '3rd';
        }
        else
        {
            $quarter = '4th';
        }
        
        $zipcodeExist = ZipCode::where('zip_code',(int)$quote['zip'])->first();
        
        if($zipcodeExist!=null)
        {
            $pres = $zipcodeExist['pres'];
            $bcbs = $zipcodeExist['bcbs'];
            $thnm = $zipcodeExist['thnm'];
            $friday = $zipcodeExist['friday'];
            $quote_employees = QuoteEmployee::where('quote_id',$quote['id'])->get();
             
              $employees = [];
              $spouse_count = 0;
              $dependent_count = 0;
              $employee_count =0;
              foreach($quote_employees as $quote_employee)
              {
                    $employee= ClientEmployee::where('id',$quote_employee['emp_id'])->first();
                    array_push($employees,$employee);
                    if($employee['member_type']=='Spouse')
                    {
                        $spouse_count = $spouse_count + 1;
                    }
                    else if($employee['member_type']=='Dependent'){
                        $dependent_count = $dependent_count + 1;
                    }
                    else if($employee['member_type']=='Employee'){
                        $employee_count = $employee_count + 1;
                    }
              }  

            $client['emp_count'] = sizeof($employees);
            $client['spouse_count'] =  $spouse_count;
            $client['dependent_count'] = $dependent_count;
            $client['employee_count'] = $employee_count;
           
        
            $age = $employees[0]['age'];
                if($age>63)
                {
                    $age = '64+';
                }
                if($year==2021)
                    {
                        if($age<15 && $age>=0)
                        {
                            $age = '0-14';
                        }
                        // elseif($age<=24 && $age>=21)
                        // {
                        //     $age = '21-24';
                        // }
                        else
                        {
                             $age = $age;
                        }
                    }
            $planpricing = [];
            
            $planpricing[0] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.county',$thnm)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.age',$age)->get();
            
              
            foreach($planpricing[0] as $pricing)
            {
                $sum = null;
                foreach($employees as $emp)
                {
                    
                    $age = $emp['age'];
                    
                    if($age>63)
                    {
                        $age = '64+';
                    }
                    if($year==2021)
                    {
                        if($age<15 && $age>=0)
                        {
                            $age = '0-14';
                        }
                        else
                        {
                             $age = $age;
                        }
                    }
                    
                    $planss = PlanPrice::where('provider',$pricing['provider'])->where('county',$pricing['county'])->where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('plan_prices.year',$year)->where('quarter',$quarter)->where('age',$age)->first();
                
                    $sum = $sum+floatval($planss['value']);
                }
    
                $sum = round($sum, 2);

                $pricing['monthly_premium'] = $sum;
                
                $pricing['plan_details'] = PlanDetail::where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('provider','THNM')->get();

            }
                    
            $planpricing[1] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.county',$bcbs)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.age',$age)->get();
           
            foreach($planpricing[1] as $pricing)
            {
                $sum = null;
                foreach($employees as $emp)
                {
                    
                    $age = $emp['age'];
                    
                    if($age>63)
                    {
                        $age = '64+';
                    }
                    if($year==2021)
                    {
                        if($age<=15 && $age>=0)
                        {
                            $age = '0-14';
                        }
                        else
                        {
                             $age = $age;
                        }
                    }
                    $planss = PlanPrice::where('provider',$pricing['provider'])->where('county',$pricing['county'])->where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('plan_prices.year',$year)->where('quarter',$quarter)->where('age',$age)->first();
                    $sum = $sum+floatval($planss['value']);
                   
                }
                $sum = round($sum, 2);

                $pricing['monthly_premium'] = $sum;
                
                $pricing['plan_details'] = PlanDetail::where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('provider','BCBS')->get();
                //empty array
            }
            
            $planpricing[2] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.county',$friday)->where('plan_prices.provider','Friday')->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.age',$age)->get();
             
            foreach($planpricing[2] as $pricing)
            {
                $sum = null;
                foreach($employees as $emp)
                {
                    
                    $age = $emp['age'];
                    
                    if($age>63)
                    {
                        $age = '64+';
                    }
                    if($year==2021)
                    {
                        if($age<15 && $age>=0)
                        {
                            $age = '0-14';
                        }
                        else
                        {
                             $age = $age;
                        }
                    }
                    $planss = PlanPrice::where('provider',$pricing['provider'])->where('county',$pricing['county'])->where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('plan_prices.year',$year)->where('quarter',$quarter)->where('age',$age)->first();
                    $sum = $sum+floatval($planss['value']);
                }
                $sum = round($sum, 2);

                $pricing['monthly_premium'] = $sum;
                
                $pricing['plan_details'] = PlanDetail::where('plan_name',$pricing['plan_name'])->where('year',$year)->where('provider','Friday')->get();
                
                $pricing['checked'] = false;
            }
            
                
                if($age>63)
                {
                    $age = '64+';
                }
                if($year==2021)
                    {
                        if($age<15 && $age>=0)
                        {
                            $age = '0-14';
                        }
                        elseif($age<=24 && $age>=21)
                        {
                            $age = '21-24';
                        }
                        else
                        {
                             $age = $age;
                        }
                    }

            
            $planpricing[3] = PlanPrice::select('plan_prices.*','providers.logo')->join('providers','plan_prices.provider','=','providers.name')->where('plan_prices.county',$pres)->where('plan_prices.year',$year)->where('plan_prices.quarter',$quarter)->where('plan_prices.age',$age)->get();
           
            foreach($planpricing[3] as $pricing)
            {
                $sum = null;
                foreach($employees as $emp)
                {
                    $age = $emp['age'];
                    if($age>63)
                    {
                        $age = '64+';
                    }
                    if($year==2021)
                    {
                        if($age<15 && $age>=0)
                        {
                            $age = '0-14';
                        }
                        elseif($age<=24 && $age>=21)
                        {
                            $age = '21-24';
                        }
                        else
                        {
                             $age = $age;
                        }
                    }
                    $planss = PlanPrice::where('provider',$pricing['provider'])->where('county',$pricing['county'])->where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('plan_prices.year',$year)->where('quarter',$quarter)->where('age',$age)->first();
                    
                    $sum = $sum+floatval($planss['value']);
                  
                }
                $sum = round($sum, 2);

                $pricing['monthly_premium'] = $sum;
                
                $pricing['plan_details'] = PlanDetail::where('plan_name','like', '%' .$pricing['plan_name']. '%')->where('provider','Presbyterian')->get();
                
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
    

}