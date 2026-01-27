<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Midtrans Configuration
    |--------------------------------------------------------------------------
    |
    | This file is for storing the configuration settings for Midtrans payment
    | gateway integration in your application. You can set your Midtrans
    | server key, client key, and environment mode here.
    |
    */

    'server_key' => env('MIDTRANS_SERVER_KEY', 'your-server-key-here'),

    'client_key' => env('MIDTRANS_CLIENT_KEY', 'your-client-key-here'),

    'is_production' => env('MIDTRANS_IS_PRODUCTION', false),

    'is_sanitized' => env('MIDTRANS_IS_SANITIZED', true),

    'is_3ds' => env('MIDTRANS_IS_3DS', true),

];
