<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

$user_id = require_auth();
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') error('Method not allowed', 405);

$id  = (int)($_GET['id'] ?? 0);
if (!$id) error('Cart item ID required');

$body     = get_json_body();
$quantity = (int)($body['quantity'] ?? 0);
if ($quantity < 1) error('Quantity must be at least 1');

$db = get_db();
$stmt = $db->prepare('UPDATE CartItems SET quantity = ? WHERE id = ? AND user_id = ?');
$stmt->execute([$quantity, $id, $user_id]);

if ($stmt->rowCount() === 0) error('Cart item not found', 404);
success(null, 'Cart updated');
