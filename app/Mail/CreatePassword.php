<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class CreatePassword extends Mailable
{
    public $token;
    public $fullname;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($token,$fullname)
    {
        $this->token = $token;
        $this->fullname = $fullname;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('info@xecutequotes.com', 'xecutequotes')
            ->subject('Create Password')
            ->markdown('mails.create-password')
            ->with([
                'token' => $this->token,'fullname'=>$this->fullname
            ]);
    }
}