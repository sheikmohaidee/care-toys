<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

$db     = get_db();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Silently check admin session to decide whether to return all or active-only
    start_admin_session();
    $is_admin = !empty($_SESSION['admin_logged_in']);

    if ($is_admin) {
        $stmt = $db->query('SELECT * FROM Coupons ORDER BY created_at DESC');
    } else {
        $stmt = $db->query('SELECT * FROM Coupons WHERE is_active = 1 ORDER BY created_at DESC');
    }
    success($stmt->fetchAll());
}

error('Method not allowed', 405);
