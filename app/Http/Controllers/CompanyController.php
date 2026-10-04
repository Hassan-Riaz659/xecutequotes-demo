<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Company;
use Response;

class CompanyController extends Controller
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
    
    public function index()
    {
        $companies = Company::all();
        return view('admin.companies.index',compact('companies'));
    }
    
    public function createList()
    {
        $curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.sendgrid.com/v3/marketing/lists",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"name\":\"Contact List\"}",
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer " . config('services.sendgrid.key')
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
    }
    
    public function addCompany()
    {
        return view('admin.companies.add-company');
    }
    
    public function addCompanyPost(Request $request)
    {
        $company=new Company();
        $company->name=$request->name;
        $company->email=$request->email;
        $company->phone=$request->phone;
        $company->save();
        
      return response(['status'=>1]);
    }
    
    public function calculateCensus()
    {
        return view('admin.quote.calculate-census');
    }
}
