<?php
require_once 'cors.php';
require_once 'connection.php';

require $_SERVER["DOCUMENT_ROOT"] . "/react-eticaret/vendor/autoload.php";

use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

try {
    $secretKey = "ayse_yi_cok_seviyorum_16_01_2026_!";
    $headers = apache_request_headers();
    $authHeader = $headers["Authorization"] ?? "";
    if (!$authHeader) {
        echo json_encode([
            "isFinishLoginTime" => true
        ]);
        exit;
    }
    $jwt = str_replace('Bearer ', '', $authHeader);
    if (!$jwt) {
        echo json_encode([
            "isFinishLoginTime" => true
        ]);
        exit;
    }
    $decode = JWT::decode($jwt, new Key($secretKey, "HS256"));
    $id = $decode->data->id;
    echo json_encode([
        "isFinishLoginTime" => false
    ]);
} catch (ExpiredException $expiredEx) {
    echo json_encode([
        "isFinishLoginTime" => true
    ]);
}
