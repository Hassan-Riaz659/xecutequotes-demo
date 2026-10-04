<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Charge;
use Carbon\Carbon;
use App\User;

class CheckDateCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'CheckDate:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command will check if the expiry date has come';

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
        $users     = User::all();
        
        foreach($users as $user)
        {
            $expiry_date = $user->next_charge_date;
            $total_licenses = $user->total_additional_licenses;
            
            if($expiry_date == $dateTime)
            {
                 $latest_transaction = Charge::where('user_id',$user['id'])->max('id');
                 $card_details = Charge::where('id',$latest_transaction)->first(); 
                 $end = date('Y-m-d', strtotime('+1 year'));
                
                 $charge = new Charge();
                 $charge->user_id = $user['id'];
                 $charge->retref = $card_details['retref'];
                if($total_licenses > 0 )
                {
                  $total_licenses =  $total_licenses * 1000; 
                  $charge = $total_licenses + 2500;
                  $charge->amount = $charge;
                }
                else
                {
                 $charge->amount = 2500;   
                }
                 
                 $charge->card_num = $card_details['card_num'];
                 $charge->exp_month= $card_details['exp_month'];
                 $charge->exp_year = $card_details['exp_year'];
                 $charge->next_charge_date = $end;
                 $charge->status = 1;
                 $charge->save();
                 
                 $user = User::findOrFail($user['id']);
                 $user->subscription_type = 'annual';
                 $user->next_charge_date = $end;
                 $user->credits_left = "unlimited";
                 $user->save();
                
            }
        }
        
    }
}
