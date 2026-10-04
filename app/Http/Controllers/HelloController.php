<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ClientEmployee;
use App\PlanPrice;
use App\Client;
use Response;
use App\Quote;
use App\QuoteEmployee;
use Carbon\Carbon;
use App\QuotePlan;
class HelloController extends Controller
{
    public function clientDetails($id)
    {
        $date = date('Y-m-d');
        
        $newDate = \Carbon\Carbon::createFromFormat('Y-m-d', $date)
                    ->format('m-d-Y');
  
    
        $client = Client::where('id',$id)->first();
        
        $quotes = Quote::where('client_id',$id)->orderBy('created_at', 'DESC')->get();
              
        $totalQuotes = $quotes->count();
        
        $num_padded  = sprintf("%03d", $totalQuotes);
        $totalQuotes = $num_padded; // returns 04
        //dd($totalQuotes);
        
     foreach($quotes as $quote)
     {  
         //mm/dd/yy
         $dating = Carbon::parse($quote['effective_date']);
         $dating = $dating->format('d-m-Y');
         $quote['effective_date'] = $dating;
         if($quote->plan_assign != null)
           {
            $assigned_plan  = PlanPrice::where('id',$quote->plan_assign)->first();
            $quote['assigned_plan'] = $assigned_plan['plan_name']; 
           }
       
       }
        
        $employees = ClientEmployee::where('client_id',$id)->where('deleted_at',null)->get();
         foreach($employees as $employee)
        {  
         $dating = Carbon::parse($employee['dob']);
         $dating = $dating->format('d-m-Y');
         $employee['dob'] = $dating;
        
        }
        
        return  Response::json(['client'=>$client,'employees'=>$employees,'quotes'=>$quotes,'newDate'=>$newDate,'totalQuotes'=>$totalQuotes]);
    }
    public function editClientEmployee($id)
    {
        $employee = ClientEmployee::findOrFail($id);
        $quote_employee = QuoteEmployee::where('emp_id',$id)->first();
        $quote = Quote::where('id',$quote_employee->quote_id)->first();
        $date = $quote->effective_date;
        return Response::json(['employee'=>$employee,'date'=>$date]);
    }
    public function updateClientEmployee(Request $request)
    {
        $employee = ClientEmployee::findOrFail($request->empId);
        $employee->member_type = $request->member_type;
        $employee->f_name = $request->fName;
        $employee->l_name = $request->lName;
        $employee->dob = $request->dob;
        $employee->age = $request->age;
        
        $employee->save();
        return Response::json(['flag'=>1]);
     
    }
    public function deleteClientEmployee($id)
    {
            $time = \Carbon\Carbon::now();
            $time = $time->toDateTimeString();

            ClientEmployee::where('id',$id)->first()->update(['deleted_at'=>$time]);

       return Response::json(['flag'=>1]);
        
    }
    
    public function deleteCensusEmployee(Request $request)
    {
            $time = \Carbon\Carbon::now();
            $time = $time->toDateTimeString();
            $emp_id = $request->id;
            $quote_employee = QuoteEmployee::where('emp_id',$emp_id)->get();
           if($quote_employee->count() >= 2)
            {
                $quote_employee = QuoteEmployee::where('emp_id',$emp_id)->where('quote_id',$request->quote_id)->first();
                $quote_employee->delete();
            }
           else
           {    
                $quote_emp = QuoteEmployee::where('emp_id',$emp_id)->where('quote_id',$request->quote_id)->first();
                $quote_emp->delete();
                ClientEmployee::where('id',$emp_id)->delete();
            }
            

            
       return Response::json(['flag'=>1]);
        
    }
    
    
    public function deleteQuote($id)
    {
        
        $quote_id  = $id;
        $quote_employees = QuoteEmployee::where('quote_id',$quote_id)->get();
        foreach($quote_employees as $employee)
        {
           $existingEmployee = QuoteEmployee::where('emp_id',$employee->emp_id)->get();
           
           if($existingEmployee->count() >= 2)
            {
                $employee->delete();
            }
           else
           {    
                $employee->delete();
                ClientEmployee::where('id',$employee->emp_id)->delete();
            }
        }
        
        Quote::where('id',$quote_id)->delete();
        
        return Response::json(['flag'=>1]);
    }
    public function deleteClient($id)
    {
        
        $quotes = Quote::where('client_id',$id)->get();
        foreach($quotes as $quote)
        {   
            
            $employees = QuoteEmployee::where('quote_id',$quote->id)->get();
            if($employees->count() >= 1)
            {
            
                foreach($employees as $employee)
                {
                    ClientEmployee::where('id',$employee->emp_id)->delete();
                    $employee->delete();
                }
             
            }
            
            $quote->delete();
        }
        
        
        Client::where('id',$id)->delete();
        
        return Response::json(['flag'=>1]);
    }
    public function quotePreview($id)
    {
        
        $quote = Quote::where('id',$id)->first();
        $dating = Carbon::parse($quote['effective_date']);
        $dating = $dating->format('m-d-Y');
        $quote['effective_date'] = $dating;
        
        $records = QuotePlan::where('quote_id',$id)->first();
        
        $array = json_decode($records['chosen_plans']);
        $plansFlag = false;
        
        if($array != null)
        {
            $plansFlag = true;    
        }
        
        $client_name = Client::where('id',$quote->client_id)->first();
        $get_plan  = PlanPrice::where('id',$quote->plan_assign)->first();
        $plan_assigned = $get_plan['plan_name']; 
        
        $quote_employees = QuoteEmployee::where('quote_id',$quote->id)->get();
        
        $employees = [];
        foreach($quote_employees as $employee)
        {
            $emp = ClientEmployee::where('id',$employee->emp_id)->first();
            if($emp != null){
            $dating = Carbon::parse($emp['dob']);
            $dating = $dating->format('m-d-Y');
            $emp['dob'] = $dating;
            array_push($employees,$emp);
            
        }

        }

         return Response::json(['quote'=>$quote,"employees"=>$employees,"client"=>$client_name,"plan_assigned"=>$plan_assigned,'plansFlag'=>$plansFlag]);
    }
}
