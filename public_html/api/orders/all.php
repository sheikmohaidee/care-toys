<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

require_admin_session();
if ($_SERVER['REQUEST_METHOD'] !== 'GET') error('Method not allowed', 405);

$db = get_db();
$stmt = $db->query(
    'SELECT o.*, u.name AS account_name 
     FROM Orders o 
     LEFT JOIN Users u ON o.user_id = u.id 
     ORDER BY o.created_at DESC'
);
success($stmt->fetchAll());
