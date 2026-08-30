<?php
/**
 * Auto-Deploy Webhook Handler for Laravel on cPanel / LiteSpeed
 * Project: Tritama Decorindo Stiker
 */

// Allow long execution time
@set_time_limit(180);
@ini_set('max_execution_time', '180');
@ini_set('memory_limit', '256M');
error_reporting(0);
ini_set('display_errors', '0');

// 1. Secret Token Verification
$secret_token = 'tritama_deploy_secret_2026';

if (!isset($_GET['token']) || $_GET['token'] !== $secret_token) {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'error',
        'message' => 'Forbidden: Invalid or missing secret token.'
    ]);
    exit();
}

// 2. Set Extended Environment Path
putenv('PATH=' . getenv('PATH') . ':/usr/local/bin:/usr/bin:/bin:/usr/local/cpanel/3rdparty/bin:/usr/local/easy/bin:/opt/cpanel/ea-php82/root/usr/bin:/opt/cpanel/ea-php83/root/usr/bin');

// 3. Locate Git Binary
$git_paths = [
    '/usr/local/cpanel/3rdparty/bin/git',
    '/usr/bin/git',
    '/bin/git',
    'git'
];

$git = 'git';
foreach ($git_paths as $path) {
    if (file_exists($path) && is_executable($path)) {
        $git = $path;
        break;
    }
}

// 4. Locate CLI PHP Binary (Do not use PHP_BINARY as LiteSpeed sets it to lsphp)
$php_candidates = [
    '/usr/local/bin/php',
    '/usr/bin/php',
    '/opt/cpanel/ea-php83/root/usr/bin/php',
    '/opt/cpanel/ea-php82/root/usr/bin/php',
    'php'
];

$php = 'php';
foreach ($php_candidates as $cand) {
    if (file_exists($cand) && is_executable($cand)) {
        $php = $cand;
        break;
    }
}

// 5. Determine Project Root Directory
$project_root = realpath(__DIR__ . '/..');
if (!$project_root || !file_exists($project_root . '/artisan')) {
    $home_dir = getenv('HOME') ?: '/home/omag8228';
    if (file_exists($home_dir . '/tritama_app/artisan')) {
        $project_root = $home_dir . '/tritama_app';
    }
}

$start_time = microtime(true);
$logs = [];
$status = 'success';

/**
 * Helper to run shell commands safely
 */
function runCommand($cmd, &$logs, &$status) {
    $output = [];
    $return_var = 0;
    exec($cmd . ' 2>&1', $output, $return_var);
    $logs[] = [
        'command' => $cmd,
        'exit_code' => $return_var,
        'output' => $output
    ];
    if ($return_var !== 0) {
        $status = 'warning';
    }
    return $return_var;
}

// Step 1: Git Fetch & Reset to latest main
runCommand("cd {$project_root} && {$git} fetch origin main && {$git} reset --hard origin/main", $logs, $status);

// Step 2: Database Migration (if artisan is accessible)
if (file_exists("{$project_root}/artisan")) {
    runCommand("cd {$project_root} && {$php} artisan migrate --force", $logs, $status);
    runCommand("cd {$project_root} && {$php} artisan optimize:clear", $logs, $status);
    runCommand("cd {$project_root} && {$php} artisan config:cache", $logs, $status);
    runCommand("cd {$project_root} && {$php} artisan route:cache", $logs, $status);
    runCommand("cd {$project_root} && {$php} artisan view:cache", $logs, $status);
    runCommand("cd {$project_root} && {$php} artisan storage:link", $logs, $status);
}

$duration = round(microtime(true) - $start_time, 2);

// Always return HTTP 200 JSON Response to GitHub
http_response_code(200);
header('Content-Type: application/json');
echo json_encode([
    'status' => $status,
    'duration' => $duration . 's',
    'timestamp' => date('Y-m-d H:i:s'),
    'project_root' => $project_root,
    'logs' => $logs
], JSON_PRETTY_PRINT);
