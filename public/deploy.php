<?php
/**
 * Auto-Deploy Webhook Handler for Laravel on cPanel
 * Project: Tritama Decorindo Stiker
 */

error_reporting(0);
ini_set('display_errors', '0');

// 1. Secret Token Verification
$secret_token = 'tritama_deploy_secret_2026';

if (!isset($_GET['token']) || $_GET['token'] !== $secret_token) {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'error',
        'message' => 'Forbidden: Invalid token.'
    ]);
    exit();
}

// 2. Set Extended Environment Path
putenv('PATH=' . getenv('PATH') . ':/usr/local/bin:/usr/bin:/bin:/usr/local/cpanel/3rdparty/bin:/usr/local/easy/bin');

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

// 4. Locate PHP Binary
$php = defined('PHP_BINARY') && file_exists(PHP_BINARY) ? PHP_BINARY : 'php';

// 5. Determine Project Root Directory
$project_root = dirname(__DIR__);

$start_time = microtime(true);
$logs = [];
$status = 'success';

/**
 * Helper to run shell commands and record logs
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

// Step 2: Database Migration
runCommand("cd {$project_root} && {$php} artisan migrate --force", $logs, $status);

// Step 3: Clear and Rebuild Laravel Caches
runCommand("cd {$project_root} && {$php} artisan optimize:clear", $logs, $status);
runCommand("cd {$project_root} && {$php} artisan config:cache", $logs, $status);
runCommand("cd {$project_root} && {$php} artisan route:cache", $logs, $status);
runCommand("cd {$project_root} && {$php} artisan view:cache", $logs, $status);

// Step 4: Ensure Storage Symlink Exists
runCommand("cd {$project_root} && {$php} artisan storage:link", $logs, $status);

$duration = round(microtime(true) - $start_time, 2);

// Response Output
header('Content-Type: application/json');
echo json_encode([
    'status' => $status,
    'duration' => $duration . 's',
    'timestamp' => date('Y-m-d H:i:s'),
    'project_root' => $project_root,
    'logs' => $logs
], JSON_PRETTY_PRINT);
