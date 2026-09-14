<?php

/**
 * Auto-Deploy Webhook Handler
 * Project: Tritama Decorindo Stiker
 */
error_reporting(0);
ini_set('display_errors', '0');

// Token keamanan
$secret_token = 'tritama_deploy_secret_2026';

if (! isset($_GET['token']) || $_GET['token'] !== $secret_token) {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Forbidden']);
    exit();
}

putenv('PATH='.getenv('PATH').':/usr/local/bin:/usr/bin:/bin:/usr/local/cpanel/3rdparty/bin');

$git = file_exists('/usr/local/cpanel/3rdparty/bin/git') ? '/usr/local/cpanel/3rdparty/bin/git' : 'git';
$output = [];
$return_var = 0;

// Cari folder root tritama_app
$target_dir = file_exists('/home/omag8228/tritama_app') ? '/home/omag8228/tritama_app' : dirname(__DIR__);

// Update otomatis ke main terbaru
exec("cd {$target_dir} && {$git} fetch origin main 2>&1 && {$git} reset --hard origin/main 2>&1", $output, $return_var);

// Bersihkan cache Laravel jika artisan tersedia
if (file_exists("{$target_dir}/artisan")) {
    exec("cd {$target_dir} && php artisan optimize:clear 2>&1", $output);
}

header('Content-Type: application/json');
echo json_encode([
    'status' => ($return_var === 0) ? 'success' : 'error',
    'output' => $output,
]);
