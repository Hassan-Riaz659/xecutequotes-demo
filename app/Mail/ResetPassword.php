<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class ResetPassword extends Mailable
{
    public $token;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
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
            ->markdown('mails.reset-password')
            ->with([
                'token' => $this->token
            ]);
    }
}