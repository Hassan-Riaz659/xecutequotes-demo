<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Newsletter;
class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }
    
    public function newsletter(Request $request)
    {
        $request->validate([
            
            'nemail' => 'email|required'
        ]);
        
        $n_email = Newsletter::where('nemail',$request->nemail)->first();
        if($n_email != null)
        {
            return response()->json(['flag'=>0]);
        }
        else{
        $newsletter = new Newsletter();
        $newsletter->nemail = $request->nemail;
        $newsletter->save();
        
        return response()->json(['flag'=>1]); 
        }
    }
    

}
