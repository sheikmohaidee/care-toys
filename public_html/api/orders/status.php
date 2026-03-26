<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

require_admin_session();
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') error('Method not allowed', 405);

$id = (int)($_GET['id'] ?? 0);
if (!$id) error('Order ID required');

$body   = get_json_body();
$status = trim($body['status'] ?? '');

$valid = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
if (!in_array($status, $valid)) error('Invalid status value');

$db = get_db();
$stmt = $db->prepare('UPDATE Orders SET status = ? WHERE id = ?');
$stmt->execute([$status, $id]);

if ($stmt->rowCount() === 0) error('Order not found or unchanged', 404);
success(null, 'Order status updated');
