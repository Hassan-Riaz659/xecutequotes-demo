<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Mail\VerifyAccountMail;
use App\Mail\EmailCode;
use Session;
use Mail;
use Response;
use App\Contact;
use Illuminate\Support\Facades\Hash;



class AuthenticationController extends Controller
{
    public function checkExistingEmail(Request $request){
        $flag = false;
        $emailExist = User::where('email',$request->email)->first();
        if($emailExist!=null)
        {
            $flag = true;
        }
        
        return Response::json(['flag'=>$flag]);
    }
    
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:55',
            'phone_number' => 'required|max:55',
            'company_url' => 'required|max:55',
            'email' => 'email|required|unique:users',
            'password' => 'required',
            'password_confirm' => 'required'
        ]);

        $validatedData['password'] = bcrypt($request->password);
        $validatedData['subscription_type'] = 'free';
        $validatedData['credits_left'] = 3;
        
        $user = User::create($validatedData);
        
        $email = $request->email;
      
        //Generate a random string.
        $token = openssl_random_pseudo_bytes(16);
        
        //Convert the binary data into hexadecimal representation.
        
        $token = bin2hex($token);

        $user = User::findOrFail($user->id);
        $userName = $user['name'];
        $user->verify_code = $token;
        if(config('demo.enabled'))
        {
            // Demo mode: no mailbox to click a link in, so the account is active right away.
            $user->status = 1;
        }
        $user->save();

        Mail::to($email)->send(new VerifyAccountMail($token,$userName));
        

        return response([ 'user' => $user,'flag'=>1]);

    }
    public function login(Request $request)
    {
        $loginData = $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('email',$request->email)->first();
        if($user !=null)
        {
            if($user['status']==0){
                if($user['role_id']==3)
                {
                    return response(['message' => 'Please check your email to verify your account.','status'=>4]);
                }
                else
                {
                return response(['message' => 'Please Enter valid credentials.','status'=>0]);
                }
            }
            
            if (!auth()->attempt($loginData)) {
            return response(['message' => 'Invalid Credentials','status'=>3]);
            }
        }
        if (!auth()->attempt($loginData)) {
            return response(['message' => 'Invalid Credentials','status'=>2]);
        }

        $accessToken = auth()->user()->createToken('authToken')->accessToken;
        Session::put('accesstoken', $accessToken);

        return response(['user' => auth()->user(), 'access_token' => $accessToken,'status'=>1]);

    }
    
    public function resendEmail(Request $request)
    {
        $email = $request->email;
        $flag = 0;
        $user = User::where('email',$request->email)->first();
        $userName = $user['name'];
        
        if($user)
        {
        Mail::to($email)->send(new VerifyAccountMail($user['verify_code'],$userName));
        $flag = 1;   
        }
        return response()->json(['flag'=>$flag]);
    }
    
    public function verifyAccount(Request $request){
        $user = User::where('verify_code',$request->code)->first();
        
        /* update status */
        $userObj = User::findOrFail($user['id']);
        $userObj->status = 1;
        $userObj->save();
        
        return 'success';
    }
    
    public function currentUser(Request $request)
    {
        return $request->user();
    }

    public function getUserData($id)
    {
        $user = User::where('id',$id)->first();
        
        return Response::json(['data'=>$user]);
        
            
    }
    
    public function passwordUpdate(Request $request)
    {
        $this->validate($request, [
        'password' => 'required',
        'new_password' => 'required',
        ]);
        
        $userObj = User::where('id',$request->user_id)->first();
       $hashedPassword = $userObj['password'];
 
       if (\Hash::check($request->password , $hashedPassword )) {
 
              $user =User::findOrFail($userObj['id']);
              $user->password = Hash::make($request->new_password);
              $user->save();
              return response()->json(['flag'=>1]);
            }
            else{
                return response()->json(['flag'=>0]);
            }
       }
       
       public function emailUpdate(Request $request)
       {
                   
        $userObj = User::where('id',$request->user_id)->first();
        
        if($userObj['email_verification_code']==$request->code)
        {           
        $user = User::findOrFail($userObj['id']);
        $user->email = $request->email;
        $user->save();
              
        return Response::json(['flag'=>'1','user'=>$user]);
            }
            else{
                return response()->json(['flag'=>0]);
        }
 
       }
       
       public function emailCode(Request $request)
       {
           $random_code = rand(1000,10000);
           
            $userObj = User::where('id',$request->user_id)->first();

            $user = User::findOrFail($userObj['id']);
            $userName = $user['name'];
            $user->email_verification_code = $random_code;
            $user->save();

            /* sending email to mailtrap */
        
            Mail::to($request->email)->send(new EmailCode($random_code,$userName));
        
        return response([ 'user' => $user,'status'=>1]);
}


        public function verifyCode(Request $request){
        $user = User::where('email_verification_code',$request->code)->first();
        
        /* update status */
        $userObj = User::findOrFail($user['id']);
        $userObj->status = 1;
        $userObj->save();
        
        return 'success';
    }

        public function infoUpdate(Request $request)
       {
      
           $this->validate($request, [
            'name' => 'required',
            ]);
            //  myFile
            // anotherFile
                
//               $profileImage = $request->file('profileImage');
               $companyLogo  = $request->file('myFile');
               
           $user = User::findOrFail($request->user_id);
        
              $user->name = $request->name;
             
              
              if($companyLogo != null){
                  
                
                
                $imageName = 'company_logo-'.time().'-'.rand(000000,999999).'.'.$companyLogo->getClientOriginalExtension();
                $destinationPath = public_path('images/companies_logos');
                
                $companyLogo->move($destinationPath,$imageName);
                    
        
                $user->company_logo= $imageName;
                
                  
              }
             
              $user->phone_number = $request->phone_number;
              $user->save();
             
              if($user->save()==true){
                  $userObj = User::where('id',$request->user_id)->first();
              return response()->json(['flag'=>1,'user'=>$userObj]);
              }
            else{
                return response()->json(['flag'=>0]);
            }
}

    public function deleteLogo($id)
    {
        User::where('id',$id)->update([
            
                'company_logo' => 'No Image'
            
            ]);
        $user = User::findorFail($id);
         return Response::json(['flag'=>'success','user'=>$user]);
    }
    
    public function deleteProfileImg($id)
    {
        User::where('id',$id)->update([
            
                'profile_img' => 'No Image'
            
            ]);
    $user = User::findorFail($id);
         return Response::json(['flag'=>'success','user'=>$user]);
    }
    
    
    
    public function contactUs(Request $request)
    {
        $flag = false;
        $contact_us = new Contact();
        $contact_us->name = $request->name;
        $contact_us->phone_number = $request->phone_number;
        $contact_us->email = $request->email;
        $contact_us->message = $request->message;
        
        if($contact_us->save())
        {
            $flag = true;
        }
        return response()->json(['flag'=>$flag]);
    }

}