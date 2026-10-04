<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class EmailCode extends Mailable
{
    public $random_code;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($random_code,$userName)
    {
        $this->random_code = $random_code;
        $this->userName = $userName;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('info@xecutequotes.com', 'xecutequotes')
            ->subject('Email Code')
            ->markdown('mails.email-code')
            ->with([
                'random_code' => $this->random_code,'userName'=>$this->userName
            ]);
    }
}
