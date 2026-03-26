<?php
// Load credentials from env file
$env_file = __DIR__ . '/env.php';
if (file_exists($env_file)) {
    require_once $env_file;
}

// ─── Shared session name helper ─────────────────────────────────────────────
function get_session_name() {
    return defined('SESSION_NAME') ? SESSION_NAME : 'care_toys_admin';
}

/**
 * Start the admin session consistently.
 * MUST call session_name() BEFORE session_start() — every time, every file.
 * Without this the session cookie name differs from what login.php created.
 */
function start_admin_session() {
    if (session_status() === PHP_SESSION_NONE) {
        // Ensure the session cookie is sent across origins
        // (required when frontend and API are on the same domain but withCredentials is used)
        session_name(get_session_name());

        $cookie_params = [
            'lifetime' => 86400,        // 24 hours
            'path'     => '/',
            'domain'   => '',           // current domain
            'secure'   => true,         // HTTPS only
            'httponly' => true,         // no JS access
            'samesite' => 'None',       // allow cross-site send with withCredentials
        ];

        // PHP 7.3+ supports samesite via session_set_cookie_params array
        if (PHP_VERSION_ID >= 70300) {
            session_set_cookie_params($cookie_params);
        } else {
            session_set_cookie_params(
                $cookie_params['lifetime'],
                $cookie_params['path'] . '; SameSite=None',
                $cookie_params['domain'],
                $cookie_params['secure'],
                $cookie_params['httponly']
            );
        }

        session_start();
    }
}

// --- CORS Headers (call at top of every endpoint) ---
function cors_headers() {
    $allowed_origins = [
        'https://caretoys.in',
        'https://www.caretoys.in',
        'http://localhost:5173',
        'http://localhost:3000',
    ];

    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    if (in_array($origin, $allowed_origins)) {
        // Reflect the exact origin — required for withCredentials CORS
        header("Access-Control-Allow-Origin: $origin");
    } elseif ($origin === '') {
        // Same-origin request (no Origin header) — reflect host
        $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        header("Access-Control-Allow-Origin: $scheme://" . $_SERVER['HTTP_HOST']);
    } else {
        // Unknown origin — deny but don't crash; refuse with a valid header
        header("Access-Control-Allow-Origin: https://caretoys.in");
    }

    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Content-Type: application/json; charset=utf-8");

    // Handle preflight
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}

// --- JSON Response Helper ---
function json_response($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit();
}

function success($data = null, $message = 'OK', $code = 200) {
    $res = ['success' => true, 'message' => $message];
    if ($data !== null) $res['data'] = $data;
    json_response($res, $code);
}

function error($message = 'Error', $code = 400) {
    json_response(['success' => false, 'message' => $message], $code);
}

// --- PDO Connection Singleton ---
function get_db() {
    static $pdo = null;
    if ($pdo === null) {
        $host = defined('DB_HOST') ? DB_HOST : 'localhost';
        $name = defined('DB_NAME') ? DB_NAME : 'care_toys';
        $user = defined('DB_USER') ? DB_USER : 'root';
        $pass = defined('DB_PASS') ? DB_PASS : '';

        try {
            $pdo = new PDO(
                "mysql:host=$host;dbname=$name;charset=utf8mb4",
                $user,
                $pass,
                [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ]
            );
        } catch (PDOException $e) {
            error('Database connection failed: ' . $e->getMessage(), 500);
        }
    }
    return $pdo;
}

// --- Auth Helpers ---
function get_bearer_token() {
    $headers = '';
    if (isset($_SERVER['Authorization'])) {
        $headers = $_SERVER['Authorization'];
    } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (function_exists('apache_request_headers')) {
        $req = apache_request_headers();
        foreach ($req as $key => $val) {
            if (strtolower($key) === 'authorization') {
                $headers = $val;
                break;
            }
        }
    }
    if (preg_match('/Bearer\s+(.+)/i', $headers, $m)) {
        return trim($m[1]);
    }
    return null;
}

function require_auth() {
    $token = get_bearer_token();
    if (!$token) error('Unauthorized', 401);

    $db = get_db();
    $stmt = $db->prepare('SELECT user_id FROM auth_tokens WHERE token = ? AND (expires_at IS NULL OR expires_at > NOW())');
    $stmt->execute([$token]);
    $row = $stmt->fetch();
    if (!$row) error('Invalid or expired token', 401);

    return (int)$row['user_id'];
}

/**
 * Guard all admin-only endpoints.
 * Uses start_admin_session() so session_name() is always set correctly first.
 */
function require_admin_session() {
    start_admin_session();
    if (empty($_SESSION['admin_logged_in'])) {
        error('Admin session required', 403);
    }
}

function get_json_body() {
    return json_decode(file_get_contents('php://input'), true) ?? [];
}
