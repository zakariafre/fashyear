<?php

return [

    /*
     * You can enable CORS for 1 or multiple paths.
     * Example: ['api/*']
     */
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'storage/*'],

    /*
     * Matches the request method. `['*']` allows all methods.
     */
    'allowed_methods' => ['*'],

    /*
     * Matches the request origin. `['*']` allows all origins.
     */
    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    /*
     * Matches the request headers. `['*']` allows all headers.
     */
    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    /*
     * Sets the Access-Control-Allow-Credentials header.
     */
    'supports_credentials' => true,
];
