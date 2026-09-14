<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Auto-detect Laravel project base path
$base_path = file_exists(__DIR__.'/../bootstrap/app.php')
    ? __DIR__.'/..'
    : '/home/omag8228/tritama_app';

// Determine if the application is in maintenance mode...
if (file_exists($base_path.'/storage/framework/maintenance.php')) {
    require $base_path.'/storage/framework/maintenance.php';
}

// Register the Composer autoloader...
require $base_path.'/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once $base_path.'/bootstrap/app.php';

// Bind active public folder so Vite finds build/manifest.json accurately
$app->usePublicPath(__DIR__);

$app->handleRequest(Request::capture());
