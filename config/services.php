<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'cardconnect' => [
        'server' => env('CARDCONNECT_SERVER', 'https://fts.cardconnect.com'),

        // Credentials used by CardConnectController (card billing endpoints).
        'billing' => [
            'merchant_id' => env('CARDCONNECT_BILLING_MERCHANT_ID'),
            'username' => env('CARDCONNECT_BILLING_USERNAME'),
            'password' => env('CARDCONNECT_BILLING_PASSWORD'),
        ],

        // Credentials used by the charge:cron renewal command.
        'cron' => [
            'merchant_id' => env('CARDCONNECT_CRON_MERCHANT_ID'),
            'username' => env('CARDCONNECT_CRON_USERNAME'),
            'password' => env('CARDCONNECT_CRON_PASSWORD'),
        ],
    ],

    'sendgrid' => [
        'key' => env('SENDGRID_API_KEY'),
    ],

    // Browser key for the Google Maps JavaScript API. Optional: the script is only loaded when set.
    'google_maps' => [
        'key' => env('GOOGLE_MAPS_API_KEY'),
    ],

];
