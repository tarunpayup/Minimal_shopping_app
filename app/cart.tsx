import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const themeColor = "#F26279";

// Cart item interface matching API response
interface CartItem {
  id: string;
  product_id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const userId = 1; // 🔹 Replace with logged-in user's ID

  // Fetch cart from API
  const fetchCart = async () => {
    try {
      let formData = new FormData();
      formData.append("action", "get");
      formData.append("user_id", userId.toString());

      const response = await fetch(
        "https://tarunbansal.co.in/android/react/cart.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const json = await response.json();
      if (json.status === "success") {
        setCartItems(json.cart);
      } else {
        console.log("Error fetching cart:", json.message);
      }
    } catch (error) {
      console.error("Fetch Cart Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Calculate total
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.card}>
      {/* Load image from API */}
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>₹{item.price.toFixed(2)}</Text>
        <Text style={styles.productQty}>Qty: {item.quantity}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={themeColor} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Cart</Text>
      </View>

      {/* Heading */}
      <Text style={styles.heading}>Cart Items</Text>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Bottom Bar with Total + Checkout */}
      <View style={styles.bottomBar}>
        <Text style={styles.totalText}>Total: ₹{totalAmount.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    backgroundColor: themeColor,
    paddingVertical: 15,
    alignItems: "center",
  },
  topBarText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 15,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: { flex: 1, justifyContent: "center" },
  productName: { fontSize: 16, fontWeight: "bold" },
  productPrice: { fontSize: 14, color: themeColor, marginVertical: 2 },
  productQty: { fontSize: 13, color: "#555" },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  totalText: { fontSize: 18, fontWeight: "bold" },
  checkoutButton: {
    backgroundColor: themeColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
