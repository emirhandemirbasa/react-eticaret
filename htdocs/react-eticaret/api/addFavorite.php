<?php

require_once 'cors.php';
require_once 'connection.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Geçersiz istek parametresi!"
    ]);
    exit;
}

$id = $_POST["product_id"] ?? "";

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
        "success" => false,
        "message" => "Bir ürün favorilere eklemek için öncelikle giriş yapmalısınız!"
    ]);
    exit;
}

$jwt = str_replace("Bearer ", "", $authHeader);
if (!$jwt) {
    echo json_encode([
        "success" => false,
        "message" => "Token bulunamadı!"
    ]);
    exit;
}

try {
    $decode = JWT::decode($jwt, new Key($secretKey, "HS256"));
    $sql = "SELECT * FROM favorite_products WHERE product_id=? AND account_id=?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$id, $decode->data->id]);
    if ($stmt->fetch(PDO::FETCH_ASSOC)) {
        $sql = "DELETE FROM favorite_products WHERE product_id=? AND account_id=?";
        $stmt = $db->prepare($sql);
        $stmt->execute([$id, $decode->data->id]);
        echo json_encode([
            "success" => true,
            "message" => "Bu ürünü favorilerden kaldırdınız!"
        ]);
    } else {
        $sql = "INSERT INTO favorite_products(product_id,account_id) VALUES (?,?)";
        $stmt = $db->prepare($sql);
        $stmt->execute([$id, $decode->data->id]);
        echo json_encode([
            "success" => true,
            "message" => "Bu ürünü favorilere eklediniz!"
        ]);
    }
} catch (Exception $exception) {
    echo json_encode([
        "success" => false,
        "message" => "Hata: " . $exception
    ]);
} catch (ExpiredException $expiredException) {
    echo json_encode([
        "success" => false,
        "message" => "Token süreniz doldu!"
    ]);
}
