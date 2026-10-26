<?php
require_once 'cors.php';
require_once 'connection.php';
require_once 'data.php';
require_once $_SERVER["DOCUMENT_ROOT"] . "/react-eticaret/vendor/autoload.php";

use Firebase\JWT\JWT;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $data["email"] ?? "";
    $password = $data["password"] ?? "";
    if (empty($email)) {
        echo json_encode([
            "success" => false,
            "message" => "Email kısmı boş bırakılamaz!",
            "data" => []
        ]);
        exit;
    }
    if (empty($password)) {
        echo json_encode([
            "success" => false,
            "message" => "Şifre kısmı boş bırakılamaz!",
            "data" => []
        ]);
        exit;
    }
    $active = 1;
    $sql = "SELECT * FROM account WHERE email=? AND active=?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$email, $active]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result && password_verify($password, $result["password"])) {

        $secretKey = "ayse_yi_cok_seviyorum_16_01_2026_!";
        $payload = [
            "iss" => "localhost",
            "iat" => time(),
            "exp" => time() + (60 * 60 * 24),
            "data" => [
                "id" => $result["id"],
                "email" => $result["email"]
            ]
        ];

        $jwt = JWT::encode($payload, $secretKey, 'HS256');

        echo json_encode([
            "success" => true,
            "message" => "Başarıyla giriş yaptınız.",
            "data" => [
                "id" => $result["id"],
                "email" => $result["email"],
                "isLoggedIn" => true,
                "token" => $jwt
            ]
        ]);
        exit;
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Email veya şifre hatalı.",
            "data" => []
        ]);
        exit;
    }
}

echo json_encode([
    "success" => false,
    "message" => "Geçersiz parametre",
    "data" => []
]);
exit;
