<?php
require_once 'cors.php';
require_once 'connection.php';

if ($_SERVER["REQUEST_METHOD"] != "DELETE") {
    echo json_encode([
        "success" => false,
        "message" => "Geçersiz istek parametresi.",
        "data" => []
    ]);
    exit;
}

$id = $_GET["id"] ?? "";
if (empty($id)) {
    echo json_encode([
        "success" => false,
        "message" => "Lütfen bir adres seçtiğinizden emin olun!",
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
    $sql = "SELECT * FROM adresses WHERE id=?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result["account_id"] != $decode->data->id) {
        echo json_encode([
            "status" => "error",
            "message" => "Bir başkasına ait adresi siliemezsin!",
            "data" => []
        ]);
        exit;
    }
    $sql = "DELETE FROM adresses WHERE id=?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$id]);
    echo json_encode([
        "success" => true,
        "message" => "Başarıyla adres silindi.",
        "data" => []
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Yetkilendirme başarısız: " . $e->getMessage(),
        "data" => []
    ]);
}
