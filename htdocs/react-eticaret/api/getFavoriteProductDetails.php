<?php
require_once 'cors.php';
require_once 'connection.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    echo json_encode([
        "success" => false,
        "message" => "Geçersiz istek parametresi!"
    ]);
    exit;
}

$sql = "SELECT p.book_name as kitapAdi,COUNT(f.product_id) as count FROM favorite_products f INNER JOIN products p ON f.product_id=p.id GROUP BY p.id,p.book_name ORDER BY count DESC LIMIT 10";
$stmt = $db->prepare($sql);
$stmt->execute();
$result =  $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode([
    "success" => true,
    "message" => "Veriler başarıyla getirildi.",
    "data" => $result
]);
exit;
