<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') error('Method not allowed', 405);

$body     = get_json_body();
$username = trim($body['username'] ?? '');
$password = $body['password'] ?? '';

$admin_user = defined('ADMIN_USERNAME') ? ADMIN_USERNAME : 'admin';
$admin_pass = defined('ADMIN_PASSWORD') ? ADMIN_PASSWORD : 'admin123';

if ($username !== $admin_user || $password !== $admin_pass) {
    error('Invalid admin credentials', 401);
}

// Use the shared helper — sets session_name() + SameSite=None cookie params
start_admin_session();
$_SESSION['admin_logged_in'] = true;
$_SESSION['admin_user']      = $username;

success(null, 'Admin login successful');
