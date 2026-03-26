<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

require_admin_session();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') error('Method not allowed', 405);

$body           = get_json_body();
$code           = strtoupper(trim($body['code'] ?? ''));
$discount_type  = $body['discount_type'] ?? 'percentage';
$discount_value = (float)($body['discount_value'] ?? 0);
$expiry_date    = $body['expiry_date'] ?? null;
$title          = trim($body['title'] ?? '');
$description    = trim($body['description'] ?? '');
$bg_color       = trim($body['bg_color'] ?? '');
$badge_text     = trim($body['badge_text'] ?? '');
$image_url      = trim($body['image_url'] ?? '');
$is_active      = isset($body['is_active']) ? (int)(bool)$body['is_active'] : 1;

if (!$code) error('Coupon code is required');
if (!in_array($discount_type, ['percentage', 'fixed'])) error('Invalid discount type');
if ($discount_value <= 0) error('Discount value must be positive');
if ($discount_type === 'percentage' && $discount_value > 100) error('Percentage cannot exceed 100');
if ($expiry_date && !strtotime($expiry_date)) error('Invalid expiry date');

$db = get_db();

// Check duplicate code
$stmt = $db->prepare('SELECT id FROM Coupons WHERE code = ?');
$stmt->execute([$code]);
if ($stmt->fetch()) error('Coupon code already exists', 409);

$stmt = $db->prepare(
    'INSERT INTO Coupons (code, discount_type, discount_value, expiry_date, title, description, bg_color, badge_text, image_url, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);
$stmt->execute([$code, $discount_type, $discount_value, $expiry_date ?: null, $title, $description, $bg_color, $badge_text, $image_url, $is_active]);
$id = (int)$db->lastInsertId();

success(['id' => $id, 'code' => $code], 'Coupon created', 201);
