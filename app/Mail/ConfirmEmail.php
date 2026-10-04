<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class ConfirmEmail extends Mailable
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
        return $this->from('info@xecutequotes.com', 'xecutequotes')
            ->subject('Confirm Email')
            ->markdown('mails.confirm-email')
            ->with([
                'token' => $this->token,
                'userName' => $this->userName
            ]);
    }
}