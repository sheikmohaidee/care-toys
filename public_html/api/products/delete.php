<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

require_admin_session();
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') error('Method not allowed', 405);

$id = (int)($_GET['id'] ?? 0);
if (!$id) error('Product ID required');

$db = get_db();
$stmt = $db->prepare('DELETE FROM Products WHERE id = ?');
$stmt->execute([$id]);

if ($stmt->rowCount() === 0) error('Product not found', 404);
success(null, 'Product deleted');
