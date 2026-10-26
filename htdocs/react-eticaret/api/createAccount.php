<?php
require_once 'cors.php';
require_once 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ad = $_POST["ad"] ?? "";
    $soyad = $_POST["soyad"] ?? "";
    $email = $_POST["email"] ?? "";
    $password = $_POST["password"] ?? "";
    $repassword = $_POST["repassword"] ?? "";
    if (empty($ad)) {
        echo json_encode([
            "success" => false,
            "message" => "Ad kısmı boş bırakılamaz!"
        ]);
        exit;
    }
    if (empty($soyad)) {
        echo json_encode([
            "success" => false,
            "message" => "Soyad kısmı boş bırakılamaz!"
        ]);
        exit;
    }
    if (empty($email)) {
        echo json_encode([
            "success" => false,
            "message" => "Email kısmı boş bırakılamaz!"
        ]);
        exit;
    }
    if (empty($password)) {
        echo json_encode([
            "success" => false,
            "message" => "Şifre kısmı boş bırakılamaz!"
        ]);
        exit;
    }
    if (empty($repassword)) {
        echo json_encode([
            "success" => false,
            "message" => "Şifre tekrar kısmı boş bırakılamaz!"
        ]);
        exit;
    }
    $sql = "SELECT * FROM account WHERE email=?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$email]);
    if ($stmt->fetchAll(PDO::FETCH_ASSOC)) {
        echo json_encode([
            "success" => false,
            "message" => "Bu E-posta adresi kullanılıyor!"
        ]);
        exit;
    }
    if ($password != $repassword) {
        echo json_encode([
            "success" => false,
            "message" => "Şifreleriniz uyuşmuyor!"
        ]);
        exit;
    }
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $sql = "INSERT INTO account (email,password) VALUES (?,?)";
    $stmt = $db->prepare($sql);
    $stmt->execute([$email, $hashed_password]);
    $id = $db->lastInsertId();
    $sql = "INSERT INTO account_detail (name,surname,account_id) VALUES (?,?,?)";
    $stmt = $db->prepare($sql);
    $stmt->execute([$ad, $soyad, $id]);
    echo json_encode([
        "success" => true,
        "message" => "Kayıt oldunuz. Lütfen giriş yapın."
    ]);
    exit;
}
