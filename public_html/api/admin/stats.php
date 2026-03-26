<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

require_admin_session();
if ($_SERVER['REQUEST_METHOD'] !== 'GET') error('Method not allowed', 405);

$db = get_db();

$products_cnt   = (int)$db->query('SELECT COUNT(*) FROM Products')->fetchColumn();
$orders_cnt     = (int)$db->query('SELECT COUNT(*) FROM Orders')->fetchColumn();
$users_cnt      = (int)$db->query('SELECT COUNT(*) FROM Users')->fetchColumn();
$revenue        = (float)$db->query('SELECT COALESCE(SUM(total_amount), 0) FROM Orders')->fetchColumn();
$active_coupons = (int)$db->query('SELECT COUNT(*) FROM Coupons WHERE is_active = 1')->fetchColumn();

$low_stock = $db->query('SELECT id, name, stock FROM Products WHERE stock < 5 ORDER BY stock ASC LIMIT 10')->fetchAll();

success([
    'total_products'  => $products_cnt,
    'total_orders'    => $orders_cnt,
    'total_users'     => $users_cnt,
    'total_revenue'   => $revenue,
    'active_coupons'  => $active_coupons,
    'low_stock_items' => $low_stock,
]);
