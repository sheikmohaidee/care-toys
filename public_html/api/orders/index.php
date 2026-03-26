<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

$user_id = require_auth();
if ($_SERVER['REQUEST_METHOD'] !== 'GET') error('Method not allowed', 405);

$db = get_db();
$stmt = $db->prepare('SELECT * FROM Orders WHERE user_id = ? ORDER BY created_at DESC');
$stmt->execute([$user_id]);
success($stmt->fetchAll());
