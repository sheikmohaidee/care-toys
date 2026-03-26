<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

require_admin_session();
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') error('Method not allowed', 405);

$id   = (int)($_GET['id'] ?? 0);
if (!$id) error('Coupon ID required');

$body = get_json_body();

// Build dynamic update — only update fields that were sent
$fields = [];
$params = [];

$allowed = ['code', 'discount_type', 'discount_value', 'expiry_date', 'title', 'description', 'bg_color', 'badge_text', 'image_url', 'is_active'];
foreach ($allowed as $f) {
    if (array_key_exists($f, $body)) {
        $fields[] = "$f = ?";
        if ($f === 'is_active') {
            $params[] = (int)(bool)$body[$f];
        } elseif ($f === 'code') {
            $params[] = strtoupper(trim($body[$f]));
        } else {
            $params[] = $body[$f] === '' ? null : $body[$f];
        }
    }
}

if (empty($fields)) error('No fields to update');

$params[] = $id;
$db = get_db();
$stmt = $db->prepare('UPDATE Coupons SET ' . implode(', ', $fields) . ' WHERE id = ?');
$stmt->execute($params);

if ($stmt->rowCount() === 0) {
    // Check if it exists at all
    $check = $db->prepare('SELECT id FROM Coupons WHERE id = ?');
    $check->execute([$id]);
    if (!$check->fetch()) error('Coupon not found', 404);
}

success(null, 'Coupon updated');
