<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

require_admin_session();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') error('Method not allowed', 405);

// --- Fields from multipart/form-data ---
$name        = trim($_POST['name'] ?? '');
$price       = (float)($_POST['price'] ?? 0);
$stock       = (int)($_POST['stock'] ?? 0);
$category_id = (int)($_POST['category_id'] ?? 1);
$description = trim($_POST['description'] ?? '');
$isLimited   = !empty($_POST['isLimited']) && $_POST['isLimited'] !== 'false' ? 1 : 0;
$isDeal      = !empty($_POST['isDeal']) && $_POST['isDeal'] !== 'false' ? 1 : 0;
$isCollector = !empty($_POST['isCollector']) && $_POST['isCollector'] !== 'false' ? 1 : 0;

if (!$name) error('Product name is required');
if ($price <= 0) error('Price must be positive');

// --- Handle image upload ---
$image_url = trim($_POST['image_url'] ?? ''); // fallback: manual URL still accepted

if (!empty($_FILES['image']['name'])) {
    $file        = $_FILES['image'];
    $allowed_ext = ['jpg', 'jpeg', 'png', 'webp'];
    $max_size    = 2 * 1024 * 1024; // 2MB

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $allowed_ext)) {
        error('Only JPG, JPEG, PNG, and WEBP images are allowed');
    }
    if ($file['size'] > $max_size) {
        error('Image must be under 2MB');
    }
    if ($file['error'] !== UPLOAD_ERR_OK) {
        error('Upload failed with error code: ' . $file['error']);
    }

    // Validate it's actually an image (MIME check)
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime  = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
    $allowed_mime = ['image/jpeg', 'image/png', 'image/webp'];
    if (!in_array($mime, $allowed_mime)) {
        error('Invalid image file');
    }

    $upload_dir = __DIR__ . '/../../uploads/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }

    $filename  = uniqid('img_', true) . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '_', $file['name']);
    $dest_path = $upload_dir . $filename;

    if (!move_uploaded_file($file['tmp_name'], $dest_path)) {
        error('Failed to save uploaded image', 500);
    }

    $image_url = '/uploads/' . $filename;
}

$db = get_db();
$stmt = $db->prepare(
    'INSERT INTO Products (name, price, stock, category_id, description, image_url, isLimited, isDeal, isCollector)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
);
$stmt->execute([$name, $price, $stock, $category_id, $description, $image_url, $isLimited, $isDeal, $isCollector]);
$id = (int)$db->lastInsertId();

success(['id' => $id, 'name' => $name, 'price' => $price, 'image_url' => $image_url], 'Product created', 201);
