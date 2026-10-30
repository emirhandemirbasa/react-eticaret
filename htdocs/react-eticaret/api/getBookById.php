<?php
header('Content-Type: application/json; charset=UTF-8');
require_once 'cors.php';
require_once 'data.php';

$path_info = isset($_SERVER["PATH_INFO"]) ? $_SERVER["PATH_INFO"] : "";
$segments = explode("/", trim($path_info, "/"));
$id = isset($segments[0]) ? $segments[0] : null;
if ($id) {
    require_once 'connection.php';
    $sql = "SELECT * FROM products WHERE id=?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$id]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "veriler" => $result
    ]);
} else {
    echo json_encode([
        "success" => false,
        "veriler" => []
    ]);
}
