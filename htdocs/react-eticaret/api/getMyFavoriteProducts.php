<?php
require_once 'cors.php';
require_once 'connection.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    echo json_encode([
        "success" => false,
        "message" => "Geçersiz istek parametresi!",
        "data" => []
    ]);
}

require_once $_SERVER["DOCUMENT_ROOT"] . "/react-eticaret/vendor/autoload.php";

use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$header = apache_request_headers();
$authHeader = $header["Authorization"] ?? $header["Authorization"] ?? "";

if (!$authHeader) {
    echo json_encode([
        "success" => false,
        "message" => "Lütfen hesabınıza giriş yapın!",
        "data" => []
    ]);
    exit;
}
$secretKey = "ayse_yi_cok_seviyorum_16_01_2026_!";
$jwt = str_replace("Bearer ", "", $authHeader);

if (!$jwt) {
    echo json_encode([
        "success" => false,
        "message" => "Token bulunamadı!",
        "data" => []
    ]);
    exit;
}

try {
    $decode = JWT::decode($jwt, new Key($secretKey, "HS256"));
    $accountId = $decode->data->id; //account_id
    $sql = "SELECT * FROM products as p INNER JOIN favorite_products as fp ON fp.product_id=p.id WHERE fp.account_id=?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$accountId]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode([
        "success" => true,
        "message" => "Favori ürünler listelendi.",
        "data" => $result
    ]);
} catch (Exception $exception) {
    echo json_encode([
        "success" => true,
        "message" => "HATA: " . $exception
    ]);
} catch (ExpiredException $expiredException) {
    echo json_encode([
        "success" => true,
        "message" => "Token süresi doldu!"
    ]);
}
