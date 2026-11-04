<?php
require_once 'cors.php';
require_once 'data.php';
require_once 'connection.php';

if ($_SERVER["REQUEST_METHOD"] != "PUT") {
    echo json_encode([
        "success" => false,
        "message" => "Geçersiz istek parametresi!",
    ]);
    exit;
}

$id = $data["id"] ?? "";

if (empty($id)) {
    echo json_encode([
        "success" => false,
        "message" => "İptal edilirken bir hata oluştu!"
    ]);
    exit;
}

require_once $_SERVER["DOCUMENT_ROOT"] . "/react-eticaret/vendor/autoload.php";

use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretKey = "ayse_yi_cok_seviyorum_16_01_2026_!";

$header = apache_request_headers();
$authHeader = $header["Authorization"] ?? $header["Authorization"] ?? "";

if (!$authHeader) {
    echo json_encode([
        "success" => false,
        "message" => "Lütfen hesabınıza giriş yapın!",
    ]);
    exit;
}

$jwt = str_replace("Bearer ", "", $authHeader);

if (!$jwt) {
    echo json_encode([
        "success" => false,
        "message" => "Tokeniniz bulunamadı!"
    ]);
    exit;
}

$sql = "SELECT state FROM orders WHERE id=?";
$stmt = $db->prepare($sql);
$stmt->execute([$id]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);
if ($result["state"] == "İptal Onayı Bekleniyor") {
    echo json_encode([
        "success" => false,
        "message" => "Bu sipariş zaten iptal onayı bekliyor!",
        "data" => []
    ]);
    exit;
}
if ($result["state"] == "İptal") {
    echo json_encode([
        "success" => false,
        "message" => "Bu sipariş zaten iptal edilmiş!"
    ]);
    exit;
}
if ($result["state"] != "Bekliyor") {
    echo json_encode([
        "success" => false,
        "message" => "Bu sipariş bu aşamada iptal edilemez!"
    ]);
    exit;
}

try {
    $decode = JWT::decode($jwt, new Key($secretKey, "HS256"));
    $sql = "UPDATE orders SET state=? WHERE id=? ";
    $state = "İptal Onayı Bekleniyor";
    $stmt = $db->prepare($sql);
    $stmt->execute([$state, $id]);
    echo json_encode([
        "success" => true,
        "message" => "Başarıyla iptal talebiniz iletildi!"
    ]);
} catch (Exception $exception) {
    echo json_encode([
        "success" => false,
        "message" => "Hata:" . $exception
    ]);
} catch (ExpiredException $expiredException) {
    echo json_encode([
        "success" => false,
        "message" => "Hata: token süreniz doldu."
    ]);
}
