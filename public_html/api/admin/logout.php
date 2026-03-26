<?php
require_once __DIR__ . '/../config/db.php';
cors_headers();

start_admin_session();
session_unset();
session_destroy();

success(null, 'Logged out');
