<?php

/**
 * Router for PHP's built-in web server (`php artisan serve`).
 *
 * This application is laid out for a web server whose document root is the
 * project folder: index.php is in the project root and the assets are
 * requested as /public/images/..., /public/css/... and so on. The stock Laravel
 * router expects the public folder to be the document root instead, so it
 * cannot find those files. This one serves files from the public folder under
 * their /public/... address and sends every other request to the application.
 *
 * Only files inside the public folder are ever served as static files, so
 * nothing else in the project (.env, vendor, the source code) can be fetched.
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$publicDir = realpath(__DIR__ . '/public');
$file = realpath(__DIR__ . $uri);

if (strpos($uri, '/public/') === 0
    && $file !== false
    && is_file($file)
    && strpos($file, $publicDir . DIRECTORY_SEPARATOR) === 0
    && pathinfo($file, PATHINFO_EXTENSION) !== 'php'
    && basename($file)[0] !== '.') {
    $types = [
        'css' => 'text/css', 'js' => 'application/javascript', 'json' => 'application/json',
        'png' => 'image/png', 'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'gif' => 'image/gif',
        'svg' => 'image/svg+xml', 'ico' => 'image/x-icon', 'webp' => 'image/webp', 'pdf' => 'application/pdf',
        'mp4' => 'video/mp4', 'woff' => 'font/woff', 'woff2' => 'font/woff2', 'ttf' => 'font/ttf',
        'eot' => 'application/vnd.ms-fontobject', 'txt' => 'text/plain', 'html' => 'text/html',
    ];
    $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));

    header('Content-Type: ' . (isset($types[$extension]) ? $types[$extension] : 'application/octet-stream'));
    header('Content-Length: ' . filesize($file));
    readfile($file);

    return true;
}

chdir(__DIR__);

require_once __DIR__ . '/public/index.php';
