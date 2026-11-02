<?php
require_once 'connection.php';
require_once 'cors.php';

if ($_SERVER["REQUEST_METHOD"] != "GET") {
    echo json_encode([
        "success" => false,
        "message" => "Patametre hatası!",
        "data" => []
    ]);
    exit;
}
require $_SERVER["DOCUMENT_ROOT"] . "/react-eticaret/vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


$secretKey = "ayse_yi_cok_seviyorum_16_01_2026_!";

$headers = apache_request_headers();
$authHeader = $headers["Authorization"] ?? $headers["Authorization"] ?? "";

if (!$authHeader) {
    echo json_encode([
        "success" => false,
        "message" => "Lütfen hesabınıza giriş yapın!",
        "data" => []
    ]);
    exit;
}

$jwt = str_replace('Bearer ', '', $authHeader);
// echo json_encode([
//     "token" => $jwt
// ]);
// exit;

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
    $sql = "SELECT * FROM adresses WHERE account_id=?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$decoded->data->id]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (empty($result)) {
        echo json_encode([
            "success" => true,
            "message" => "Lütfen bir adres ekleyin!",
            "data" => []
        ]);
        exit;
    } else {
        echo json_encode([
            "success" => true,
            "message" => "Başarıyla bilgiler getirildi.",
            "data" => $result
        ]);
        exit;
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Yetkilendirme başarısız: " . $e->getMessage(),
        "data" => []
    ]);
}
