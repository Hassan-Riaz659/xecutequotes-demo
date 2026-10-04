<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Demo mode
    |--------------------------------------------------------------------------
    |
    | When DEMO_MODE=true the application runs without any external service:
    |
    |  - payments go to App\Services\Payment\DemoGateway instead of CardConnect;
    |  - mail is written to the log instead of being sent;
    |  - PDF files are rendered from local files and their links point at this
    |    server instead of https://xecutequotes.com;
    |  - new registrations are verified right away (no email link needed).
    |
    | It is off by default, so production behaves exactly as before.
    |
    */

    'enabled' => env('DEMO_MODE', false),

];
