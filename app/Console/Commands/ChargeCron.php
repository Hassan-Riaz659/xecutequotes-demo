<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Charge;
use App\Services\Payment\PaymentGateway;

class ChargeCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'charge:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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
        $current_date = date('Y-m-d');
        
        $gateway = app(PaymentGateway::class);


        $results = Charge::where('next_charge_date',$current_date)->get();

        foreach($results as $results)
        {

            $gateway->capture($results['retref']);
            // if($authorization_response['respstat']=='A'){
                Charge::where('id',$results['id'])->update([
                    
                        'next_charge_date' => date('Y-m-d', strtotime('+1 year'))
                    
                    ]);
            // }
        }
    }
}
