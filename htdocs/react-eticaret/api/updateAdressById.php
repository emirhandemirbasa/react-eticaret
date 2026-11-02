<?php
require_once 'cors.php';
require_once 'connection.php';
require_once 'data.php';
if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
    echo json_encode([
        "success" => false,
        "message" => "Geçersiz istek parametresi!"
    ]);
    exit;
}
$id = $data["id"] ?? "";
if (empty($id)) {
    echo json_encode([
        "success" => false,
        "message" => "Adres bilgisi bulunamadı!"
    ]);
    exit;
}

// adres_ad_soyad: selectedAdress.adress_ad_soyad,
// adres_adi: selectedAdress.adress_name,
// sehir_adi: selectedAdress.city,
// ilce_adi: selectedAdress.district,
// adres_detay: selectedAdress.adress_detail,
// adres_telefon: selectedAdress.adress_phone

$adres_ad_soyad = $data["adres_ad_soyad"] ?? "";
$adres_adi = $data["adres_adi"] ?? "";
$sehir_adi = $data["sehir_adi"] ?? "";
$ilce_adi = $data["ilce_adi"] ?? "";
$adres_detay = $data["adres_detay"] ?? "";
$adres_telefon = $data["adres_telefon"] ?? "";


if (empty($adres_ad_soyad)) {
    echo json_encode([
        "success" => false,
        "message" => "Adres adı soyadı kısmı boş bırakılamaz!"
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
        "message" => "Telefon kısmı boş bırakılamaz!"
    ]);
    exit;
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
        "message" => "Lütfen giriş yapın!"
    ]);
    exit;
}
$secretKey = "ayse_yi_cok_seviyorum_16_01_2026_!";
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
    $sql = "SELECT * FROM adresses WHERE id=? AND account_id=?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$id, $decode->data->id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$result) {
        echo json_encode([
            "success" => false,
            "message" => "Düzenlenecek adres bulunamadı!"
        ]);
        exit;
    }
    $sql = "UPDATE adresses SET adress_ad_soyad=?,city=?,district=?,adress_detail=?,adress_name=?,adress_phone=? WHERE id=? AND account_id=?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$adres_ad_soyad, $sehir_adi, $ilce_adi, $adres_detay, $adres_adi, $adres_telefon, $id, $decode->data->id]);
    echo json_encode([
        "success" => true,
        "message" => "Başarıyla adres güncellendi!"
    ]);
    exit;
} catch (Exception $exception) {
    echo json_encode([
        "success" => false,
        "message" => "Hata: " . $exception
    ]);
    exit;
} catch (ExpiredException $expiredException) {
    echo json_encode([
        "success" => false,
        "message" => "Token süresi doldu."
    ]);
    exit;
}
