<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];

// GET single product by ?id=
if ($method === 'GET' && isset($_GET['id'])) {
    $id = (int)$_GET['id'];
    $stmt = $db->prepare('SELECT * FROM Products WHERE id = ?');
    $stmt->execute([$id]);
    $product = $stmt->fetch();
    if (!$product) error('Product not found', 404);
    success($product);
}

// GET all products
if ($method === 'GET') {
    $category = isset($_GET['category']) ? (int)$_GET['category'] : null;
    if ($category) {
        $stmt = $db->prepare('SELECT * FROM Products WHERE category_id = ? ORDER BY created_at DESC');
        $stmt->execute([$category]);
    } else {
        $stmt = $db->query('SELECT * FROM Products ORDER BY created_at DESC');
    }
    success($stmt->fetchAll());
}

error('Method not allowed', 405);
