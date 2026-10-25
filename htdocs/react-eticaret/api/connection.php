<?php
$host = "localhost";
$dbname = "react_eticaret";
$user = "root";
$password = "";
$db = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
try {
} catch (PDOException $ex) {
    echo $ex->getMessage();
}
