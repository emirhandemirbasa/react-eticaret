<?php
require_once 'connection.php';
require_once 'cors.php';

if ($_SERVER["REQUEST_METHOD"] != "GET") {
    echo json_encode([
        "success" => false,
        "message" => "Geçersiz istek parametresi.",
        "data" => []
    ]);
    exit;
}


require_once $_SERVER["DOCUMENT_ROOT"] . "/react-eticaret/vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretKey = "ayse_yi_cok_seviyorum_16_01_2026_!";

$headers = apache_request_headers();
$authHeader = $headers["Authorization"] ?? $headers["Authorization"] ?? "";

if (!$authHeader) {
    echo json_encode([
        "success" => false,
        "message" => "Token bulunamadı!",
        "data" => []
    ]);
    exit;
}

$jwt = str_replace('Bearer ', '', $authHeader);

if (!$jwt) {
    echo json_encode([
        "success" => false,
        "message" => "Geçersiz token formatı!",
        "data" => []
    ]);
    exit;
}

try {
    $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
    $sql = "SELECT * FROM orders WHERE account_id=?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$decoded->data->id]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode([
        "success" => true,
        "message" => "Veriler getirildi.",
        "data" => $result
    ]);
    exit;
} catch (Exception $ex) {
    echo json_encode([
        "status" => "error",
        "message" => "Yetkilendirme başarısız: " . $ex->getMessage(),
        "data" => []
    ]);
    exit;
}
