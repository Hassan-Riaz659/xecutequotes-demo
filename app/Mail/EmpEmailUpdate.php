<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class EmpEmailUpdate extends Mailable
{
    public $token;

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
        return $this->from('noreply@xecutequotes.com', 'xecutequotes')
            ->subject('Verify Employee Email')
            ->markdown('mails.emp-email-update')
            ->with([
                'token' => $this->token,'fullname'=>$this->fullname
            ]);
    }
}
