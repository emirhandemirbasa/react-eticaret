<?php

use Firebase\JWT\ExpiredException;

require_once 'cors.php';
require_once 'connection.php';
require_once 'data.php';

if ($_SERVER["REQUEST_METHOD"] != "PUT") {
    echo json_encode([
        "success" => false,
        "message" => "Geçersiz istek parametresi"
    ]);
    exit;
}

$ad = $data["ad"] ?? "";
$soyad = $data["soyad"] ?? "";
$telefon = $data["telefon"] ?? "";
$email = $data["email"] ?? "";

if (empty($ad)) {
    echo json_encode([
        "success" => false,
        "message" => "Ad alanı boş bırakılamaz!"
    ]);
    exit;
}

if (empty($soyad)) {
    echo json_encode([
        "success" => false,
        "message" => "Ad alanı boş bırakılamaz!"
    ]);
    exit;
}

if (empty($telefon)) {
    echo json_encode([
        "success" => false,
        "message" => "Ad alanı boş bırakılamaz!"
    ]);
    exit;
}

if (empty($email)) {
    echo json_encode([
        "success" => false,
        "message" => "Ad alanı boş bırakılamaz!"
    ]);
    exit;
}

require_once $_SERVER["DOCUMENT_ROOT"] . "/react-eticaret/vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretKey = "ayse_yi_cok_seviyorum_16_01_2026_!";
$header = apache_request_headers();
$authHeader = $header["Authorization"] ?? $header["Authorization"] ?? "";

if (!$authHeader) {
    echo json_encode([
        "success" => false,
        "message" => "Lütfen hesabınıza giriş yapın!"
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
    $sql = "UPDATE account_detail SET name=?,surname=?,phone=? WHERE account_id=?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$ad, $soyad, $telefon, $decode->data->id]);
    echo json_encode([
        "success" => true,
        "message" => "Başarıyla profil bilgilerinizi güncellediniz!",
        "data" => []
    ]);
} catch (Exception $exception) {
    echo json_encode([
        "success" => false,
        "message" => "Hata meydana geldi: " . $exception
    ]);
} catch (ExpiredException $expiredException) {
    echo json_encode([
        "success" => false,
        "message" => "Token süresi doldu!"
    ]);
}
