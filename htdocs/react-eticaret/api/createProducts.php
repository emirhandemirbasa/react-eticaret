<?php
require_once 'cors.php';
require_once 'data.php';

if (isset($_POST["book_name"])) {
    $book_name = $_POST["book_name"];
    $writer_name = $_POST["writer_name"];
    $publishing_house = $_POST["publishing_house"];
    $page_count = $_POST["page_count"];
    $book_image = $_FILES["book_image"];
    $price = $_POST["price"];
    $book_desc = $_POST["book_desc"];

    if ($_FILES["book_image"]["size"] == 0) {
        echo json_encode([
            "success" => false,
            "messgae" => "Dosya seçiniz!"
        ]);
    }



    $dosyam = $book_image["name"];
    $dosyaKonum = $book_image["tmp_name"];
    $dosyaAyir = explode(".", $dosyam); // ["1"] ["deneme"] ["png"]
    $dosyaUzanti = end($dosyaAyir);
    $dosyaAdi = implode(".", array_slice($dosyaAyir, 0, -1));
    $dosyaAdiDegistir = md5(time() . $dosyaAdi . rand(1, 9999999999999)) . '.' . $dosyaUzanti;
    if (move_uploaded_file($dosyaKonum, "../images/" . $dosyaAdiDegistir)) {
        require_once 'connection.php';
        $sql = "INSERT INTO products (book_name,writer_name,publishing_house,page_count,book_image,price,book_desc) VALUES (?,?,?,?,?,?,?)";
        $stmt = $db->prepare($sql);
        $stmt->execute([
            $book_name,
            $writer_name,
            $publishing_house,
            $page_count,
            $dosyaAdiDegistir,
            $price,
            $book_desc
        ]);
        echo json_encode([
            "success" => true,
            "message" => "Başarıyla kayıt eklendi",
        ]);
    }
}
