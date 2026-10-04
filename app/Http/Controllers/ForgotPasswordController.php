<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ForgotPassword;
use App\User;
use Mail;
use Hash;


class ForgotPasswordController extends Controller
{
    public function forgotPassword (Request $request)
    {
        $email = $request->email;
        
        //Generate a random string.
        $token = openssl_random_pseudo_bytes(16);
        
        //Convert the binary data into hexadecimal representation.
        $token = bin2hex($token);
        
        if(User::where('email', $email)->doesntExist())
        {
            return response()->json(['flag'=>0]);
        }
        
            try{
            $token = substr(sha1(rand()), 0, 60);
            
            $user = User::where('email', $request->email)->first();
            $userName = $user['name'];
            $userObj = User::findOrFail($user['id']);
            $userObj->reset_password_token = $token;
            $userObj->save();
    
      $data = array(
                'id' => $user['id']
            );
            
            Mail::to($email)->send(new ForgotPassword($token,$userName));

                return response([ 'data' => $data,'flag'=>1]);
    

        
        }catch(\Exception $exception)
        {
            return response([
                'message' => $exception->getMessage()
                ]);
        }
    }

    public function resetPassword(Request $request)
    {

        $userObj = User::where('reset_password_token',$request->token)->first();
        
              $user =User::findOrFail($userObj['id']);
              $user->password = Hash::make($request->new_password);
              $user->save();
              return response()->json(['flag'=>1]);
            }
            
}
