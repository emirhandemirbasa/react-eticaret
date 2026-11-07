<?php
require_once 'cors.php';
require_once 'connection.php';

if ($_SERVER["REQUEST_METHOD"] != "GET") {
    echo json_encode([
        "success" => false,
        "message" => "Geçersiz istek parametresi!",
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
        "message" => "Lütfen hesabınıza giriş yapın!",
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
    $decode = JWT::decode($jwt, new Key($secretKey, "HS256"));
    $sql = "SELECT a.email,ad.name,ad.surname,ad.phone FROM account_detail as ad INNER JOIN account as a ON a.id=ad.id WHERE a.id=?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$decode->data->id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode([
        "success" => true,
        "message" => "Veri başarıyla getirildi",
        "data" => $result
    ]);
    exit;
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Hata: " . $e->getMessage(),
        "data" => []
    ]);
    exit;
}
