<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

$method = $_SERVER['REQUEST_METHOD'];
$db = get_db();

if ($method === 'GET') {
    // Public endpoint — frontend reads whatsapp_number etc.
    $stmt = $db->query('SELECT setting_key, setting_value FROM Settings');
    $rows = $stmt->fetchAll();
    $settings = [];
    foreach ($rows as $row) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }
    // Return as flat object for frontend compatibility
    success([
        'whatsapp_number' => $settings['whatsapp_number'] ?? '918015293181',
        'business_name'   => $settings['business_name'] ?? 'Care Toys',
        'currency'        => $settings['currency'] ?? 'INR',
    ]);
}

if ($method === 'PUT') {
    require_admin_session();
    $body = get_json_body();

    $allowed = ['whatsapp_number', 'business_name', 'currency'];
    $stmt = $db->prepare(
        'INSERT INTO Settings (setting_key, setting_value) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)'
    );
    foreach ($allowed as $key) {
        if (array_key_exists($key, $body)) {
            $stmt->execute([$key, trim((string)$body[$key])]);
        }
    }
    success(null, 'Settings saved');
}

error('Method not allowed', 405);
