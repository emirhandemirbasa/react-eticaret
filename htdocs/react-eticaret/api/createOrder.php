<?php
require_once 'cors.php';
require_once 'connection.php';

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Hatalı istek parametresi."
    ]);
    exit;
}
$products = $_POST["products"] ?? "";
$state = $_POST["state"] ?? "";
$adress_id = $_POST["adress_id"] ?? "";
if (empty($products)) {
    echo json_encode([
        "success" => false,
        "message" => "Bir sipariş oluşturmak için sepetinizi doldurun."
    ]);
    exit;
}
if (empty($state)) {
    echo json_encode([
        "success" => false,
        "message" => "Durum atanamadı!"
    ]);
    exit;
}
if (empty($adress_id)) {
    echo json_encode([
        "success" => false,
        "message" => "Lütfen bir adres seçiniz."
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
        "message" => "Token bulunamadı!"
    ]);
    exit;
}

$jwt = str_replace('Bearer ', '', $authHeader);

if (!$jwt) {
    echo json_encode([
        "success" => false,
        "message" => "Geçersiz token formatı!"
    ]);
    exit;
}

try {
    $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
    $sql = "SELECT * FROM adresses WHERE id =?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$adress_id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $adress = json_encode([
        "adress_ad_soyad" => $result["adress_ad_soyad"],
        "city" => $result["city"],
        "district" => $result["district"],
        "adress_detail" => $result["adress_detail"],
        "adress_phone" => $result["adress_phone"],
        "id" => $result["id"],
        "account_id" => $result["account_id"],
    ]);
    $sql = "INSERT INTO orders(products,state,account_id,adress) VALUES (?,?,?,?)";
    $stmt = $db->prepare($sql);
    $stmt->execute([$products, $state, $decoded->data->id, $adress]);
    echo json_encode([
        "success" => true,
        "message" => "Başarıyla sipariş oluşturdunuz."
    ]);
    exit;
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Yetkilendirme başarısız: " . $e->getMessage()
    ]);
}
