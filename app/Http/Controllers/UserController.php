<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response;
use App\LicensedEmployee;
use App\Mail\CreatePassword;
use Mail;
use App\User;
use Illuminate\Support\Facades\Hash;
use App\Charge;

class UserController extends Controller
{
     public function viewEmployee($userid){
        $employee = LicensedEmployee::where('broker_id',$userid)->get();
        return Response::json(['data'=>$employee]);
        
    }
    
    public function editBrokerEmpDetails($id)
    {
        
        $employee = LicensedEmployee::where('id',$id)->first();
        
        return Response::json(['data'=>$employee]);
        
        //here also change name in user table
        /*if email is changed then should edit in user table and also in licensed employees table.*/
        
    }
    
    public function getFiles(Request $request)
    {
      // The Add Data import is switched off and this endpoint only confirms the request. It used to rename
      // every Friday plan ("Friday " -> "Friday HMO ") on each call, which corrupted the plan names when it
      // was submitted more than once.
      return Response::json(['flag'=>1]);
        // $counter = 0;
        // $provider = $request->provider;
        // $year = $request->year;
        // $quarter = $request->quarter;
        // $planName = $request->planName;
        // $county = $request->county;

        // $values = $request->values;
        // $arrays = explode(' ', $values);
        // //dd($array);
        // $prices = [];
        // foreach($arrays as $array)
        // {  
        //     if($array != "$")
        //     {
        //     array_push($prices,$array);
        //     }
        // }

        // for($i=0; $i<=50; $i++)
        // {
        //     if($i==0)
        //     { 
        //         $prices[$i] = str_replace("$"," ","$prices[$i]");
        //         echo $provider."<br>";
        //         echo $year."<br>";
        //         echo $quarter."<br>";
        //         echo "0-14"."<br>";
        //         echo $county."<br>";
        //         echo $planName."<br>";
        //         echo $prices[$i]."<br>";
        //         echo "---------------"."<br>";
                
        //         $planPrice = new PlanPrice();
        //         $planPrice->provider = $provider;
        //         $planPrice->year = $year;
        //         $planPrice->quarter = $quarter;
        //         $planPrice->age  = "0-14";
        //         $planPrice->county  = $county;
        //         $planPrice->plan_name  = $planName;
        //         $planPrice->value  = $prices[$i];
        //         $planPrice->save();
        //         $counter++;
        //     }
        //     else
        //     {
        //         $j = $i + 14;
        //         $prices[$i] = str_replace("$"," ","$prices[$i]");
        //         echo $provider."<br>";
        //         echo $year."<br>";
        //         echo $quarter."<br>";
        //         if($j== 64)
        //         {
        //             $j = $j."+";
        //             echo $j."<br>";
        //         }
        //         else
        //         {
        //          echo $j."<br>";   
        //         }
        //         echo $county."<br>";
        //         echo $planName."<br>";
        //         echo $prices[$i]."<br>";
        //         echo "---------------"."<br>";

        //         $planPrice = new PlanPrice();
        //         $planPrice->provider = $provider;
        //         $planPrice->year = $year;
        //         $planPrice->quarter = $quarter;
        //         $planPrice->age  = $j;
        //         $planPrice->county  = $county;
        //         $planPrice->plan_name  = $planName;
        //         $planPrice->value  = $prices[$i];
        //         $planPrice->save();
        //         $counter++;
        //     }
        //     //echo $values[$i]."<br>";
        // }

//        dd(12345,'counter',$counter++);

    }
    
    public function updateEmployee(Request $request)
{   
        //id is employee id,first get employee records then get user record by user_id.
        //here also change name in user table
        /*if email is changed then should edit in user table and also in licensed employees table.*/
        
        $alreadyExist = false;
        
        $employee =LicensedEmployee::where('id',$request->id)->first();
        $user =User::where('id',$employee->user_id)->first();
        $CheckEmail = User::where('email',$request->email)->count(); 
        
        if($request->email != $user['email'])
        {       
                 if($CheckEmail == 0){
                   
                $token='';
                
                 $fullname = $request->first_name.' '.$request->last_name;
                 
                 $user =User::where('id',$employee->user_id)->first();
                 
                 $user->name = $fullname;
                 $user->phone_number = $request->get('phone_no');
                
                 $user->email = $request->get('email');
                 $user->status = 0;
                 $user->password= Hash::make('123456');
                 
                 $user->save();
                 
                 
                 $employee = LicensedEmployee::where('id',$request->id)->first();
                 $employee->user_id =$user->id;
                 $employee->broker_id =$request->get('user_id');
                 $employee->first_name = $request->get('first_name');
                 $employee->last_name = $request->get('last_name');
                 $employee->email = $request->get('email');
                 $employee->phone_no = $request->get('phone_no');
                 $employee->save();
                 
                 $email = $request->email;
                
                //Generate a random string.
                $token = openssl_random_pseudo_bytes(16);
                
                //Convert the binary data into hexadecimal representation.
                $token = bin2hex($token);
                    $userObj = User::where('create_password_token',$request->token)->first();
                    $userObj = User::findOrFail($user['id']);
                    $userObj->create_password_token = $token;
                    $userObj->save();
                    
                   Mail::to($email)->send(new CreatePassword($token,$fullname));
                 }
                
                 
                 return Response::json(['data'=>$employee,'flag'=>1]);
        }
        else
        {
            $alreadyExist = true;
            return Response::json(['alreadyExist'=>$alreadyExist]);
        }
         
}

    public function deleteEmployee($id)
    {
       
          $employee = LicensedEmployee::find($id);
          
          $user_id  =  $employee['user_id'];
          $employee->delete();
          $user = User::findorFail($user_id);
          $user->delete();
         
         return Response::json(['flag'=>'success']);
    }

    public function checkEmail(Request $request)
    {
        return Response::json(['flag'=>1]);
    }
    
    public function checkBrokerEmail(Request $request)
    {

        $checkEmail = User::where('email',$request['email'])->count();
        if($checkEmail >= 1)
        {
            
   
            $sameUser = LicensedEmployee::where('id',$request['id'])->where('email',$request['email'])->count();    
            //means same user,and it can have same email.
            if($sameUser == 1)
            {
                
                return Response::json(['flag'=>false]);
            }
            else
            {
                
                return Response::json(['flag'=>true]);
            }
        }
        else
        {
            return Response::json(['flag'=>false]);
        }
    }
    
    public function addBrokerEmployee(Request $request)
    {
        $flag = 0;
        $fullname = $request->first_name.' '.$request->last_name;
        
        $checkEmail = User::where('email',$request->email)->count();
        
        
        if($checkEmail == 1)
        {
            $flag = 2;
            
        }
        else{
        
        $user = User::findorFail($request->user_id);    
        
        
        $user2 = new User();
        
        $user2->role_id = 3;
        $user2->name = $fullname;
        $user2->phone_number = $request->phone_no;
        $user2->email=$request->email;
        $user2->company_logo = $user['company_logo'];
        
        
        $user2->password= Hash::make('12345678');
        //Generate a random string.
        $token = openssl_random_pseudo_bytes(16);
        
        //Convert the binary data into hexadecimal representation.
        $token = bin2hex($token);
        
        $user2->create_password_token = $token;
        $user2->save();
        
        $charge_table = Charge::where('user_id',$request->user_id)->where('additional_licenses_left','!=',0)->first();
      
        $employee = new LicensedEmployee();
        $employee->broker_id =$request->user_id;
        $employee->first_name = $request->first_name;
        $employee->last_name = $request->last_name;
        $employee->email = $request->email;
        $employee->phone_no = $request->phone_no;
        $employee->charge_id = $charge_table['id'];
        $employee->user_id=$user2->id;
        $employee->save();
        
        $user = User::findOrFail($request->user_id);
        $current_license = $user->additional_license;
        if($current_license!=0){
            $user->additional_license = $current_license - 1;
        }
        $user->save();
        
        if($charge_table != null)
        {
            $licenses_left = $charge_table->additional_licenses_left;
            $charge_table->additional_licenses_left = $licenses_left - 1;
            $charge_table->save();
            
        }
        $email = $request->email;
        
        Mail::to($email)->send(new CreatePassword($token,$fullname));
        $flag = 1;
        }
        
        return Response::json(['flag'=>$flag]);
    }
    
    public function createPassword (Request $request)
    {
            $userObj = User::where('create_password_token',$request->token)->first();
            $user =User::findOrFail($userObj['id']);
            $user->password = Hash::make($request->new_password);
            $user->status = 1;
            $user->save();
            return response()->json(['flag'=>1]);
    }
    
    public function getAllUsers()
    {
        $users = User::all();
        foreach($users as $user)
        {
          $role = $user->role_id;
          if($user->subscription_type == "0")
          {
              $user->subscription_type = "free";
          }
          
          if($role == 1)
          {
              $user->role_id = "Admin";
          }
          else if($role == 2 )
          {
              $user->role_id = "Broker";
          }
          else
          {
              $user->role_id = "Employee";
          }
        }
        return Response::json(['users'=>$users]);
    }
    public function getUser($id)
    {
        
        $user = User::findOrfail($id);
        return Response::json(['user'=>$user]);
    }
    public function updateAdminPassword(Request $request)
    {
            $user = User::where('id',$request->id)->first();
            $boughtCredits = $user->bought_credits + $request->extraCredits;
            $user->name = $request->name;
            $user->bought_credits = $boughtCredits;
            if($request->password != null)
            {
            $user->password = Hash::make($request->password);
            }
            $user->save();
            
            return response()->json(['flag'=>1]);
        
    }

    
}
