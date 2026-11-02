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
$adres_ad_soyad = $_POST["adres_ad_soyad"] ?? "";
$adres_adi = $_POST["adres_adi"] ?? "";
$sehir_adi = $_POST["sehir_adi"] ?? "";
$ilce_adi = $_POST["ilce_adi"] ?? "";
$adres_detay = $_POST["adres_detay"] ?? "";
$adres_telefon = $_POST["adres_telefon"] ?? "";
if (empty($adres_ad_soyad)) {
    echo json_encode([
        "success" => false,
        "message" => "Ad soyad kısmı boş bırakılamaz!"
    ]);
    exit;
}
if (empty($adres_adi)) {
    echo json_encode([
        "success" => false,
        "message" => "Adres adı kısmı boş bırakılamaz!"
    ]);
    exit;
}
if (empty($sehir_adi)) {
    echo json_encode([
        "success" => false,
        "message" => "Şehir adı kısmı boş bırakılamaz!"
    ]);
    exit;
}
if (empty($ilce_adi)) {
    echo json_encode([
        "success" => false,
        "message" => "İlçe adı kısmı boş bırakılamaz!"
    ]);
    exit;
}
if (empty($adres_detay)) {
    echo json_encode([
        "success" => false,
        "message" => "Adres detay kısmı boş bırakılamaz!"
    ]);
    exit;
}
if (empty($adres_telefon)) {
    echo json_encode([
        "success" => false,
        "message" => "Adrese ait telefon kısmı boş bırakılamaz!"
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
    $sql = "INSERT INTO adresses (adress_ad_soyad,city,district,adress_detail,adress_name,adress_phone,primary_adress,account_id) VALUES (?,?,?,?,?,?,?,?)";
    $stmt = $db->prepare($sql);
    $primary = 0;
    $stmt->execute([$adres_ad_soyad, $sehir_adi, $ilce_adi, $adres_detay, $adres_adi, $adres_telefon, $primary, $decoded->data->id]);
    echo json_encode([
        "success" => true,
        "message" => "Başarıyla adres oluşturdunuz!"
    ]);
    exit;
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "eklenirken hata oluştu."
    ]);
    exit;
}
