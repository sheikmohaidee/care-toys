<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') error('Method not allowed', 405);

$body = get_json_body();
$email    = trim($body['email'] ?? '');
$password = $body['password'] ?? '';

if (!$email || !$password) error('Email and password are required');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) error('Invalid email format');

$db = get_db();
$stmt = $db->prepare('SELECT id, name, password FROM Users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password'])) {
    error('Invalid credentials', 401);
}

// Generate token and store in DB (expires in 30 days)
$token = bin2hex(random_bytes(32));
$expires = date('Y-m-d H:i:s', strtotime('+30 days'));

$stmt = $db->prepare('INSERT INTO auth_tokens (user_id, token, expires_at) VALUES (?, ?, ?)');
$stmt->execute([$user['id'], $token, $expires]);

success([
    'token' => $token,
    'user'  => [
        'id'    => (int)$user['id'],
        'name'  => $user['name'],
        'email' => $email,
    ]
], 'Login successful');
