<?php
include "config.php"; // DB connection

$user_id = $_POST['user_id'];
$product_id = $_POST['product_id'];
$quantity = $_POST['quantity'] ?? 1;

if (!$user_id || !$product_id) {
    echo json_encode(["status" => "error", "message" => "Missing parameters"]);
    exit;
}

// Check if already exists
$check = $conn->prepare("SELECT * FROM cart WHERE user_id=? AND product_id=?");
$check->bind_param("ii", $user_id, $product_id);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    // Update quantity
    $row = $result->fetch_assoc();
    $newQty = $row['quantity'] + $quantity;
    $update = $conn->prepare("UPDATE cart SET quantity=? WHERE user_id=? AND product_id=?");
    $update->bind_param("iii", $newQty, $user_id, $product_id);
    $update->execute();
} else {
    // Insert new item
    $insert = $conn->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)");
    $insert->bind_param("iii", $user_id, $product_id, $quantity);
    $insert->execute();
}

echo json_encode(["status" => "success", "message" => "Added to cart"]);
?>
