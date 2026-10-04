<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Charge;
use App\Services\Payment\PaymentGateway;
use App\User;
use Response;

class CardConnectController extends Controller
{
    
        public function updateBilling(Request $request)
        {
            //here put a check if current user already has a plan or not if yes then charge him for only extra licenses.
            //dd($request->all());
            //if he syas no for add lisences then only add him 2500 or give him complete calculations of aditional lisences with  
        
         $flag = 0;
         $user_id = $request->user_id;
         $card_num = $request->card_num;
         $expiry = $request->expiry;
         // The billing screen sends the month and the year separately; callers that send one "expiry" value keep working.
         $exp_month = $request->exp_month != null ? $request->exp_month : $expiry;
         $exp_year = $request->exp_year != null ? $request->exp_year : $expiry;
         // The billing screen calls these fields licenses / extra_lisences, other callers no_of_licenses / extra_licenses: both are accepted.
         $no_of_licenses = $request->no_of_licenses != null ? $request->no_of_licenses : $request->licenses;
         $extra_licenses = $request->extra_licenses != null ? $request->extra_licenses : $request->extra_lisences;
         //break it into month and year and place it into db. till then sending same exipryt to both columns.
         //$exp_year = $request->exp_year;
          
         $num = $card_num;
         $num2 = substr($num, 12, 4);
         
         $end = date('Y-m-d', strtotime('+1 year'));
        
         $request2 = [
             'account' => '4038643905779257',
              'amount'  => '1.00',
              'expiry'  => '0725',
                'capture' => 'Y'

         ];

         $authorization_response = app(PaymentGateway::class)->authorize($request2);
         if($request->subscription_type == 'free' && $request->package_choice =='yes')
         {
          
             $charge = new Charge();
             $charge->user_id = $user_id;
             $charge->retref = $authorization_response['retref'];
             $charge->amount = $request->amount;
             $totalCredits = 4 * (int)$request->no_of_packages;
             $charge->bought_credits = $totalCredits;
             $charge->card_num = $num2;
             $charge->exp_month = $exp_month;
             $charge->exp_year = $exp_year;
             

             $charge->save();
             
             $user = User::findOrFail($user_id);
             $TotalCreditsUser = $user->bought_credits;
             if($TotalCreditsUser != null)
             {
                 $TotalCreditsUser = $TotalCreditsUser+$totalCredits;
             }
             else
             {
                 $TotalCreditsUser = $totalCredits;
             }
             $user->bought_credits = $TotalCreditsUser;
             $user->save();
             $flag = 1;         
             
         }
         
        else if($request->subscription_type == 'free' && $extra_licenses =='yes')
         {
            //dd($request->all(),1);             
             //idr request all kar k dekhna hai  annual plan ki fees aygi or extra license ki bhi
             //yani sucscrpion b leni hai or extralicense b lena hai
             $charge = new Charge();
             $charge->user_id = $user_id;
             $charge->retref = $authorization_response['retref'];
             $charge->amount = $request->amount;
             $charge->total_additional_licenses = (int)$no_of_licenses;
             $charge->additional_licenses_left = (int)$no_of_licenses;

             $charge->card_num = $num2;
             $charge->exp_month = $exp_month;
             $charge->exp_year = $exp_year;
             
             $checkAnnualPlan = User::where('id',$request->user_id)->first();
             if($checkAnnualPlan != '' )
             {
                $existingEnd = $checkAnnualPlan->next_charge_date;
                $charge->next_charge_date = $existingEnd;
             }
             else
             {
                $charge->next_charge_date = $end;              
             }
             
             $charge->save();
             
             $user = User::findOrFail($user_id);
             $bought_credits = $user->bought_credits;
             
             
             $current = $user->additional_license;
             $total_licenses = $user->total_additional_licenses;
             $user->additional_license = (int)$no_of_licenses + $current;
             $user->total_additional_licenses = (int)$no_of_licenses + $total_licenses;
             $user->subscription_type = 'annual';
             $user->next_charge_date = $end;
             $user->credits_left = "unlimited";
             if($bought_credits != null)
             {
                 $user->bought_credits = null;
             }
             $user->save();
             $flag = 1;
         }
         else if($request->subscription_type == 'annual' && $extra_licenses =='yes')
         {  
             //yani sucscrpion already hai lekin extralicense lena hai
          //idr extra license ki  fees he agygi
             $charge = new Charge();
             $charge->user_id = $user_id;
             $charge->retref = $authorization_response['retref'];
             $charge->amount = $request->amount;
             $charge->total_additional_licenses = (int)$no_of_licenses;
             $charge->additional_licenses_left = (int)$no_of_licenses;
              
             $charge->card_num = $num2;
             $charge->exp_month = $exp_month;
             $charge->exp_year = $exp_year;
             
             $user = User::where('id',$request->user_id)->first();
             if($user->next_charge_date != '' )
             {
                $existingEnd = $user->next_charge_date;
                $charge->next_charge_date = $existingEnd;
                $user->next_charge_date = $existingEnd;          
                $current = $user->additional_license;
                $user->additional_license = (int)$no_of_licenses + $current;
                $total_licenses = $user->total_additional_licenses;
                $user->total_additional_licenses = (int)$no_of_licenses + $total_licenses;
             }
             else{
                $charge->next_charge_date = $end;              
                $user->next_charge_date = $end;
                $current = $user->additional_license;
                $user->additional_license = (int)$no_of_licenses + $current;
                $total_licenses = $user->total_additional_licenses;
                $user->total_additional_licenses = (int)$no_of_licenses + $total_licenses;
             
             }
             $charge->save();
             $user->save();
             $flag = 1;
         }
         else
         {
             //agr sirf annuall plan lena hai.sirf annual plan ki fees aygi
                
                 $charge = new Charge();
                 $charge->user_id = $user_id;
                 $charge->retref = $authorization_response['retref'];
                 $charge->amount = $request->amount;
                 $charge->card_num = $num2;
                 $charge->exp_month = $exp_month;
                 $charge->exp_year = $exp_year;
                 $charge->next_charge_date = $end;
                 $charge->status = 1;
                 $charge->save();
                 
                 $user = User::findOrFail($user_id);
                 $user->subscription_type = 'annual';
                 $user->next_charge_date = $end;
                 $user->credits_left = "unlimited";
                 $user->save();
                 
                 $flag = 1;
         }
         return Response::json(['data'=>$flag,'user'=>$user]);

    }
    
    public function billingCycle(Request $request)
    {
        
        
        $amountVal= 0;
        
         if($request->data==1){
             $amountVal = 1000;
        }else if ($request->data=='2'){
            $amountVal = 2000;
        }else if ($request->data=='3'){
            $amountVal = 3000;
        }else if ($request->data=='4'){
            $amountVal = 4000;
        }else if ($request->data=='5'){
            $amountVal = 5000;
        }else if ($request->data=='6'){
            $amountVal = 6000;
        }else if ($request->data=='7'){
            $amountVal = 7000;
        }else if ($request->data=='8'){
            $amountVal = 8000;
        }else if ($request->data=='9'){
            $amountVal = 9000;
        }else {
            $amountVal = 10000;
        }
        
         $checkAnnualPlan = User::where('id',$request->user_id)->first();
         
         if($checkAnnualPlan['next_charge_date'] != '' )
         {
            
            $start = strtotime(date("Y-m-d"));
            $end = strtotime(date($checkAnnualPlan['next_charge_date']));
            
            $days_between = ceil(abs($end - $start) / 86400);
     
             $total = ($amountVal / 365) * $days_between;
             $gTotal = $total;
             
         }
         else
         {
        $start = strtotime(date("Y-m-d"));
        
        $end = strtotime(date('Y-m-d', strtotime('+1 year')));
        
        
        $days_between = ceil(abs($end - $start) / 86400);
 
         $total = ($amountVal / 365) * $days_between;
         $amount = 2500;
         if($checkAnnualPlan['bought_credits'] != null)
         {
          $credits = $checkAnnualPlan['bought_credits'];
          $credits = $credits * 25.00;
          $amount  = $amount - $credits;
         }
        
         $gTotal = $total + $amount;
        }
        return response([ 'gTotal' => $gTotal,'flag'=>1]);
        
    }
    
    public function checkAvailableLicenses($id)
    {   

        $user_licenses = User::where('id',$id)->first();
        return response(['user_licenses' => $user_licenses]);
    }
    
    public function checkLicense($id)
    {
        $flag = 0;
        $user = User::findorFail($id);
        if($user->additional_license >=1)
        {
            $flag = 1;
        }
        else
        {
            $flag = 0;            
        }
        
        return Response::json(['flag'=>$flag]);
    }
    public function returnLicense(Request $request)
    {
        $user = User::findorFail($request->user_id);
        //now reduce one additional_license.
        // $last_client_details =  Client::where('user_id',$id)->where('additional_licenses_left','>=',1)->orderBy('id', 'desc')->first();
        //Also update in charge table.
        if($user->additional_license > 0)
        {
            $totalLicenses = $user->additional_license;
            $user->additional_license = $totalLicenses - 1;
            $user->save();
        //also dedcut form charge table
            return Response::json(['flag'=>1,'user'=>$user]);
        }
        else
        {
            return Response::json(['flag'=>0]);
        }
        
    }
    

}