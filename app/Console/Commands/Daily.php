<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;
use App\Charge;
use Carbon\Carbon;

class Daily extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'daily:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a Daily email to all users';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $mytime    = Carbon::now();
        $dateTime  = $mytime->toDateString();
        $users = User::where('role_id',2)->get();

    foreach($users as $user)
    {
    
    $licenses = $user->total_additional_licenses;	
    $expiry_date = $user->next_charge_date;
    if($expiry_date == $dateTime)
    {
    $latest_transaction = Charge::where('user_id',$user['id'])->max('id');
    $card_details = Charge::where('id',$latest_transaction)->first(); 
    $end = date('Y-m-d', strtotime('+1 year'));
    if($licenses >=1)
    {
        $license_charge = $licenses*1000;
        $total_amount = $license_charge + 2500;
        
    }
    else
    {
        $total_amount = 2500;
    }
    
    $charge = new Charge();
    $charge->user_id = $user['id'];
    $charge->retref = $card_details['retref'];
    $charge->amount = $total_amount;
    $charge->card_num = $card_details['card_num'];
    $charge->exp_month= $card_details['exp_month'];
    $charge->exp_year = $card_details['exp_year'];
    if($licenses >=1)
    {
        $charge->total_additional_licenses = $licenses;
        $charge->additional_licenses_left = $licenses;
    }
    $charge->next_charge_date = $end;
    $charge->status = 1;
    $charge->save();
    

    
    $user = User::findOrFail($user['id']);
    $user->subscription_type = 'annual';
    $user->total_additional_licenses = $licenses;
    $user->additional_license = $licenses;
    $user->next_charge_date = $end;
    $user->credits_left = "unlimited";
    $user->save();
    }   
    }
    }
}