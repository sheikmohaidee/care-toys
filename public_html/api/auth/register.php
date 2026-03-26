<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') error('Method not allowed', 405);

$body = get_json_body();
$name     = trim($body['name'] ?? '');
$email    = trim($body['email'] ?? '');
$password = $body['password'] ?? '';

if (!$name || !$email || !$password) error('Name, email and password are required');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) error('Invalid email format');
if (strlen($password) < 6) error('Password must be at least 6 characters');

$db = get_db();

// Check duplicate
$stmt = $db->prepare('SELECT id FROM Users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) error('Email already registered', 409);

$hash = password_hash($password, PASSWORD_BCRYPT);
$stmt = $db->prepare('INSERT INTO Users (name, email, password) VALUES (?, ?, ?)');
$stmt->execute([$name, $email, $hash]);
$userId = (int)$db->lastInsertId();

// Auto-issue token
$token   = bin2hex(random_bytes(32));
$expires = date('Y-m-d H:i:s', strtotime('+30 days'));
$stmt = $db->prepare('INSERT INTO auth_tokens (user_id, token, expires_at) VALUES (?, ?, ?)');
$stmt->execute([$userId, $token, $expires]);

success([
    'token' => $token,
    'user'  => ['id' => $userId, 'name' => $name, 'email' => $email]
], 'Registration successful', 201);
