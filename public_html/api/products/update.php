<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

require_admin_session();
// Allow POST as well (some clients can't send PUT with FormData)
$method = $_SERVER['REQUEST_METHOD'];
if ($method !== 'PUT' && $method !== 'POST') error('Method not allowed', 405);

$id = (int)($_GET['id'] ?? 0);
if (!$id) error('Product ID required');

$name        = trim($_POST['name'] ?? '');
$price       = (float)($_POST['price'] ?? 0);
$stock       = (int)($_POST['stock'] ?? 0);
$category_id = (int)($_POST['category_id'] ?? 1);
$description = trim($_POST['description'] ?? '');
$isLimited   = !empty($_POST['isLimited']) && $_POST['isLimited'] !== 'false' ? 1 : 0;
$isDeal      = !empty($_POST['isDeal']) && $_POST['isDeal'] !== 'false' ? 1 : 0;
$isCollector = !empty($_POST['isCollector']) && $_POST['isCollector'] !== 'false' ? 1 : 0;

if (!$name) error('Product name is required');

$db = get_db();

// Fetch current image_url to keep it if no new upload comes in
$curr_stmt = $db->prepare('SELECT image_url FROM Products WHERE id = ?');
$curr_stmt->execute([$id]);
$current = $curr_stmt->fetch();
if (!$current) error('Product not found', 404);

$image_url = $current['image_url']; // default: preserve existing

// Check for manual URL override
if (isset($_POST['image_url']) && trim($_POST['image_url']) !== '') {
    $image_url = trim($_POST['image_url']);
}

// Handle new file upload (takes priority over URL)
if (!empty($_FILES['image']['name'])) {
    $file        = $_FILES['image'];
    $allowed_ext = ['jpg', 'jpeg', 'png', 'webp'];
    $max_size    = 2 * 1024 * 1024;

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $allowed_ext)) error('Only JPG, JPEG, PNG, and WEBP images are allowed');
    if ($file['size'] > $max_size) error('Image must be under 2MB');
    if ($file['error'] !== UPLOAD_ERR_OK) error('Upload error: ' . $file['error']);

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime  = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
    if (!in_array($mime, ['image/jpeg', 'image/png', 'image/webp'])) error('Invalid image file');

    $upload_dir = __DIR__ . '/../../uploads/';
    if (!is_dir($upload_dir)) mkdir($upload_dir, 0755, true);

    $filename  = uniqid('img_', true) . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '_', $file['name']);
    $dest_path = $upload_dir . $filename;

    if (!move_uploaded_file($file['tmp_name'], $dest_path)) error('Failed to save image', 500);

    // Delete old image from disk if it was an uploaded file
    if ($current['image_url'] && strpos($current['image_url'], '/uploads/') !== false) {
        $old_path = __DIR__ . '/../../' . ltrim($current['image_url'], '/');
        if (file_exists($old_path)) @unlink($old_path);
    }

    $image_url = '/uploads/' . $filename;
}

$stmt = $db->prepare(
    'UPDATE Products
     SET name=?, price=?, stock=?, category_id=?, description=?, image_url=?, isLimited=?, isDeal=?, isCollector=?
     WHERE id=?'
);
$stmt->execute([$name, $price, $stock, $category_id, $description, $image_url, $isLimited, $isDeal, $isCollector, $id]);

success(['image_url' => $image_url], 'Product updated');
