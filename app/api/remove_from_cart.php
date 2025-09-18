<?php
include "config.php";

$cart_id = $_POST['cart_id'];

if (!$cart_id) {
    echo json_encode(["status" => "error", "message" => "Missing cart_id"]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM cart WHERE id=?");
$stmt->bind_param("i", $cart_id);
$stmt->execute();

echo json_encode(["status" => "success", "message" => "Item removed"]);
?>
