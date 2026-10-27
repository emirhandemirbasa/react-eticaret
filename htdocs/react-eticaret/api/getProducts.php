<?php
header('Content-Type: application/json; charset=UTF-8');
require_once 'cors.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    require_once 'connection.php';

    $search = isset($_GET["q"]) ? trim($_GET["q"]) : "";
    if (!empty($search)) {
        $sql = "SELECT * FROM products WHERE book_name LIKE :search OR publishing_house LIKE :search OR writer_name LIKE :search";
        $stmt = $db->prepare($sql);
        $paramTerm = "%" . $search . "%";
        $stmt->bindParam(":search", $paramTerm, PDO::PARAM_STR);
        $stmt->execute();
        $state = true;
    } else {
        $sql = "SELECT * FROM products";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $state = false;
    }
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "veriler" => $result
    ]);
}
