<?php

use Illuminate\Support\Str;

return [

    'default' => env('DB_CONNECTION', 'pgsql'),

    'connections' => [

        'pgsql' => [
            'driver' => 'pgsql',
            'host' => $_ENV['POSTGRES_HOST'],
            'port' => $_ENV['POSTGRES_PORT'],
            'database' => $_ENV['POSTGRES_DATABASE'],
            'username' => $_ENV['POSTGRES_USER'],
            'password' => $_ENV['POSTGRES_PASSWORD'],
            'charset' => 'utf8',
            'prefix' => '',
            'schema' => 'public',
            'sslmode' => 'prefer',
        ],
    ],

    'migrations' => 'migrations',

];
