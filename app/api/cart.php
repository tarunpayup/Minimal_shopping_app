<?php
include("db.php"); // connection file

header("Content-Type: application/json");

$action = $_POST['action'] ?? '';

if ($action == "add") {
    $user_id = intval($_POST['user_id']);
    $product_id = intval($_POST['product_id']);
    $quantity = intval($_POST['quantity'] ?? 1);

    // check if already in cart
    $check = mysqli_query($conn, "SELECT * FROM cart WHERE user_id='$user_id' AND product_id='$product_id'");
    if (mysqli_num_rows($check) > 0) {
        mysqli_query($conn, "UPDATE cart SET quantity = quantity + $quantity WHERE user_id='$user_id' AND product_id='$product_id'");
        echo json_encode(["status" => "success", "message" => "Cart updated"]);
    } else {
        mysqli_query($conn, "INSERT INTO cart (user_id, product_id, quantity) VALUES ('$user_id','$product_id','$quantity')");
        echo json_encode(["status" => "success", "message" => "Added to cart"]);
    }
}

elseif ($action == "get") {
    $user_id = intval($_POST['user_id']);
    $result = mysqli_query($conn, "SELECT c.id, c.product_id, c.quantity, p.title, p.price, p.image 
                                   FROM cart c 
                                   JOIN products p ON c.product_id=p.id 
                                   WHERE c.user_id='$user_id'");
    $cart = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $cart[] = $row;
    }
    echo json_encode(["status" => "success", "cart" => $cart]);
}

elseif ($action == "remove") {
    $cart_id = intval($_POST['cart_id']);
    mysqli_query($conn, "DELETE FROM cart WHERE id='$cart_id'");
    echo json_encode(["status" => "success", "message" => "Item removed"]);
}

else {
    echo json_encode(["status" => "error", "message" => "Invalid action"]);
}
?>
