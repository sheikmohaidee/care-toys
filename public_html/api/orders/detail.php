<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

$method = $_SERVER['REQUEST_METHOD'];
$id     = (int)($_GET['id'] ?? 0);
if (!$id) error('Order ID required');

// Attempt session for admin, fall back to user token
start_admin_session();
$is_admin = !empty($_SESSION['admin_logged_in']);

$user_id = null;
if (!$is_admin) {
    $user_id = require_auth();
}

if ($method !== 'GET') error('Method not allowed', 405);

$db = get_db();
$stmt = $db->prepare('SELECT * FROM Orders WHERE id = ?');
$stmt->execute([$id]);
$order = $stmt->fetch();

if (!$order) error('Order not found', 404);
if (!$is_admin && (int)$order['user_id'] !== $user_id) error('Unauthorized', 403);

$items_stmt = $db->prepare(
    'SELECT oi.*, p.name, p.image_url 
     FROM OrderItems oi 
     JOIN Products p ON oi.product_id = p.id 
     WHERE oi.order_id = ?'
);
$items_stmt->execute([$id]);
$order['items'] = $items_stmt->fetchAll();

success($order);
