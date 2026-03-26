<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

$user_id = require_auth();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') error('Method not allowed', 405);

$body             = get_json_body();
$items            = $body['items'] ?? [];
$total_amount     = (float)($body['total_amount'] ?? 0);
$customer_name    = trim($body['customer_name'] ?? '');
$customer_phone   = trim($body['customer_phone'] ?? '');
$customer_address = trim($body['customer_address'] ?? '');
$customer_city    = trim($body['customer_city'] ?? '');

if (empty($items)) error('No items in order');
if ($total_amount <= 0) error('Invalid total amount');

$db = get_db();

try {
    $db->beginTransaction();

    $stmt = $db->prepare(
        'INSERT INTO Orders (user_id, total_amount, customer_name, customer_phone, customer_address, customer_city, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([$user_id, $total_amount, $customer_name, $customer_phone, $customer_address, $customer_city, 'pending']);
    $order_id = (int)$db->lastInsertId();

    $item_stmt = $db->prepare('INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
    foreach ($items as $item) {
        $pid = (int)($item['product_id'] ?? 0);
        $qty = (int)($item['quantity'] ?? 1);
        $prc = (float)($item['price'] ?? 0);
        if (!$pid || $qty < 1) continue;
        $item_stmt->execute([$order_id, $pid, $qty, $prc]);
    }

    // Clear the user's cart
    $db->prepare('DELETE FROM CartItems WHERE user_id = ?')->execute([$user_id]);

    $db->commit();
    success(['order_id' => $order_id, 'total_amount' => $total_amount, 'status' => 'pending'], 'Order placed', 201);

} catch (PDOException $e) {
    $db->rollBack();
    error('Order creation failed: ' . $e->getMessage(), 500);
}
