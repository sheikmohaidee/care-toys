<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

$user_id = require_auth();
if ($_SERVER['REQUEST_METHOD'] !== 'GET') error('Method not allowed', 405);

$db = get_db();
$stmt = $db->prepare(
    'SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, p.image_url
     FROM CartItems ci
     JOIN Products p ON ci.product_id = p.id
     WHERE ci.user_id = ?'
);
$stmt->execute([$user_id]);
$items = $stmt->fetchAll();

// Compute total
$total = array_reduce($items, fn($carry, $i) => $carry + ($i['price'] * $i['quantity']), 0);

success(['items' => $items, 'total' => $total]);
