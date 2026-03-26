<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

$user_id = require_auth();
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') error('Method not allowed', 405);

$id = (int)($_GET['id'] ?? 0);
if (!$id) error('Cart item ID required');

$db = get_db();
$stmt = $db->prepare('DELETE FROM CartItems WHERE id = ? AND user_id = ?');
$stmt->execute([$id, $user_id]);

if ($stmt->rowCount() === 0) error('Cart item not found', 404);
success(null, 'Item removed from cart');
