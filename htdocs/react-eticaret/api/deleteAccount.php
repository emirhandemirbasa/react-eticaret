<?php
require_once 'cors.php';
require_once 'connection.php';

if ($_SERVER["REQUEST_METHOD"] != "PUT") {
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
    $decode = JWT::decode($jwt, new Key($secretKey, 'HS256'));
    $sql = "SELECT * FROM account WHERE id=?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$decode->data->id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result["id"] != $decode->data->id) {
        echo json_encode([
            "status" => "error",
            "message" => "Bir başkasına ait hesabı siliemezsin!",
            "data" => []
        ]);
        exit;
    }
    $sql = "UPDATE account SET active=? WHERE id=?";
    $stmt = $db->prepare($sql);
    $active = 0;
    $stmt->execute([$active, $decode->data->id]);
    echo json_encode([
        "success" => true,
        "message" => "Başarıyla hesabınız silindi!",
        "data" => []
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Yetkilendirme başarısız: " . $e->getMessage(),
        "data" => []
    ]);
}
