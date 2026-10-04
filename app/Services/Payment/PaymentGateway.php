<?php

namespace App\Services\Payment;

/**
 * The two payment operations the application needs. The implementation is
 * chosen in AppServiceProvider: CardConnectGateway normally, DemoGateway when
 * DEMO_MODE=true.
 */
interface PaymentGateway
{
    /**
     * Authorizes a charge.
     *
     * @param  array  $payment  account, amount, expiry and capture
     * @return \ArrayAccess|array  the gateway response; 'retref' is the transaction reference
     */
    public function authorize(array $payment);

    /**
     * Captures a previously authorized transaction.
     *
     * @param  string  $retref
     * @return mixed
     */
    public function capture($retref);
}
