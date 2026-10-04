<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class ForgotPassword extends Mailable
{
    public $token;
    public $userName;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($token,$userName)
    {
        $this->token = $token;
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
            ->subject('Reset Password')
            ->markdown('mails.forgot-password')
            ->with([
                'token' =>$this->token,'userName'=>$this->userName
            ]);
    }
}