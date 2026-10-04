<?php

namespace App\Services\Payment;

use Dewbud\CardConnect\CardPointe;
use Dewbud\CardConnect\Requests\AuthorizationRequest;

/**
 * The real payment gateway. The calls are the ones CardConnectController and
 * the charge:cron command used to make themselves, in the same order and with
 * the same credentials (config/services.php): the billing account for
 * authorizations and the cron account for captures.
 */
class CardConnectGateway implements PaymentGateway
{
    public function authorize(array $payment)
    {
        $client = $this->client('billing');

        $client->validateMerchantId();

        return $client->authorize(new AuthorizationRequest($payment));
    }

    public function capture($retref)
    {
        return $this->client('cron')->capture($retref);
    }

    private function client($account)
    {
        $merchant_id = config('services.cardconnect.' . $account . '.merchant_id');
        $user        = config('services.cardconnect.' . $account . '.username');
        $pass        = config('services.cardconnect.' . $account . '.password');
        $server      = config('services.cardconnect.server');

        return new CardPointe($merchant_id, $user, $pass, $server);
    }
}
