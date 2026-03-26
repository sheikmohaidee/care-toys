<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

$user_id = require_auth();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') error('Method not allowed', 405);

$body       = get_json_body();
$product_id = (int)($body['product_id'] ?? 0);
$quantity   = (int)($body['quantity'] ?? 1);

if (!$product_id) error('Product ID required');
if ($quantity < 1) error('Quantity must be at least 1');

$db = get_db();

// Verify product exists
$stmt = $db->prepare('SELECT id, stock FROM Products WHERE id = ?');
$stmt->execute([$product_id]);
$product = $stmt->fetch();
if (!$product) error('Product not found', 404);

// Upsert cart item
$stmt = $db->prepare('SELECT id, quantity FROM CartItems WHERE user_id = ? AND product_id = ?');
$stmt->execute([$user_id, $product_id]);
$existing = $stmt->fetch();

if ($existing) {
    $new_qty = $existing['quantity'] + $quantity;
    $stmt = $db->prepare('UPDATE CartItems SET quantity = ? WHERE id = ?');
    $stmt->execute([$new_qty, $existing['id']]);
    $cart_id = $existing['id'];
} else {
    $stmt = $db->prepare('INSERT INTO CartItems (user_id, product_id, quantity) VALUES (?, ?, ?)');
    $stmt->execute([$user_id, $product_id, $quantity]);
    $cart_id = (int)$db->lastInsertId();
}

success(['cart_item_id' => $cart_id], 'Item added to cart', 201);
