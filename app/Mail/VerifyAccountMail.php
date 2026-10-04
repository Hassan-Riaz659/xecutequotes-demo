<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class VerifyAccountMail extends Mailable
{
    public $token;

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
        
        return $this->from('noreply@xecutequotes.com', 'xecutequotes')
            ->subject('Verify Account')
            ->markdown('mails.verify-account')
            ->with([
                'token' => $this->token,'userName' => $this->userName
            ]);

        
    }
}
