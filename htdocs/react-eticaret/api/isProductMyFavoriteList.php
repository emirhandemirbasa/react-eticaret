<?php

require_once 'cors.php';
require_once 'connection.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    echo json_encode([
        "success" => false,
        "message" => "Geçersiz istek parametresi!"
    ]);
    exit;
}

$id = $_GET["id"] ?? "";

if (empty($id)) {
    echo json_encode([
        "success" => false,
        "message" => "Ürün bilgisi alınırken hata oluştu"
    ]);
    exit;
}

$secretKey = "ayse_yi_cok_seviyorum_16_01_2026_!";
require_once $_SERVER["DOCUMENT_ROOT"] . "/react-eticaret/vendor/autoload.php";

use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$header = apache_request_headers();
$authHeader = $header["Authorization"] ?? $header["Authorization"] ?? "";

if (!$authHeader) {
    echo json_encode([
        "success" => false
    ]);
    exit;
}

$jwt = str_replace("Bearer ", "", $authHeader);
if (!$jwt) {
    echo json_encode([
        "success" => false
    ]);
    exit;
}

try {
    $decode = JWT::decode($jwt, new Key($secretKey, "HS256"));
    $sql = "SELECT * FROM favorite_products WHERE product_id=? AND account_id=?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$id, $decode->data->id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $state = false;
    if ($result) {
        $state = true;
    } else {
        $state = false;
    }
    echo json_encode([
        "success" => $state
    ]);
} catch (Exception $exception) {
    echo json_encode([
        "success" => false
    ]);
}
