<?php
/**
 * Auto-Deploy Webhook Handler — Tritama Decorindo Stiker
 * Path: public/deploy.php
 */
error_reporting(0);
ini_set('display_errors', '0');

// Token keamanan rahasia
$secret_token = 'tritama_deploy_2026';

// 1. Validasi Token Keamanan
$token = $_GET['token'] ?? $_SERVER['HTTP_X_DEPLOY_TOKEN'] ?? '';
if ($token !== $secret_token) {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'error',
        'message' => 'Forbidden: Invalid or missing token'
    ]);
    exit();
}

// 2. Setup Environment Path cPanel
putenv('PATH=' . getenv('PATH') . ':/usr/local/bin:/usr/bin:/bin:/usr/local/cpanel/3rdparty/bin:/usr/local/php82/bin:/usr/local/php83/bin:/opt/cpanel/ea-php82/root/usr/bin:/opt/cpanel/ea-php83/root/usr/bin');

// 3. Masuk ke root direktori project
$rootDir = dirname(__DIR__);
if (!is_dir($rootDir) || !file_exists($rootDir . '/artisan')) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Cannot locate project root']);
    exit();
}
chdir($rootDir);

// 4. Deteksi binary git & php
$git = 'git';
if (file_exists('/usr/local/cpanel/3rdparty/bin/git')) {
    $git = '/usr/local/cpanel/3rdparty/bin/git';
} elseif (file_exists('/usr/bin/git')) {
    $git = '/usr/bin/git';
}

$php = 'php';
if (file_exists('/usr/local/bin/php')) {
    $php = '/usr/local/bin/php';
}

// 5. Eksekusi daftar command deployment
$commands = [
    'Git Atomic Sync' => "$git fetch origin main 2>&1 && $git reset --hard origin/main 2>&1 || ($git fetch origin master 2>&1 && $git reset --hard origin/master 2>&1)",
    'Run Migrations' => "$php artisan migrate --force 2>&1",
    'Link Storage' => "$php artisan storage:link 2>&1",
    'Clear Optimization' => "$php artisan optimize:clear 2>&1",
    'Cache Optimization' => "$php artisan optimize 2>&1",
];

$results = [];
$hasError = false;

foreach ($commands as $label => $cmd) {
    $output = [];
    $returnVar = 0;
    exec($cmd, $output, $returnVar);

    $isOk = ($returnVar === 0);
    $results[$label] = [
        'command' => $cmd,
        'status' => $isOk ? 'success' : 'error',
        'code' => $returnVar,
        'output' => $output
    ];

    if (!$isOk && strpos($label, 'Git') !== false) {
        $hasError = true;
        break;
    }
}

header('Content-Type: application/json');
echo json_encode([
    'status' => $hasError ? 'error' : 'success',
    'timestamp' => date('Y-m-d H:i:s'),
    'project' => 'Tritama Decorindo Stiker',
    'results' => $results
], JSON_PRETTY_PRINT);
