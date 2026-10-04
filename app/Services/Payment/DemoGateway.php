<?php

namespace App\Services\Payment;

/**
 * Payment gateway for the public demo. It approves every payment locally and
 * never makes a network call, so no merchant account or credentials are
 * needed. It answers in the shape of the CardConnect response: 'respstat' A
 * (approved) and a transaction reference ('retref') that starts with DEMO.
 */
class DemoGateway implements PaymentGateway
{
    public function authorize(array $payment)
    {
        return [
            'respstat' => 'A',
            'resptext' => 'Approval (demo)',
            'retref' => 'DEMO' . strtoupper(substr(sha1(uniqid('', true)), 0, 8)),
            'authcode' => 'DEMO01',
            'amount' => isset($payment['amount']) ? $payment['amount'] : '0.00',
        ];
    }

    public function capture($retref)
    {
        return [
            'respstat' => 'A',
            'resptext' => 'Approval (demo)',
            'retref' => $retref,
        ];
    }
}
