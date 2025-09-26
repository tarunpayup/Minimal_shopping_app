import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [quantity, setQuantity] = useState(0);

  // TODO: Replace with logged-in user id from auth context
  const userId = 1;

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#000" style={{ flex: 1 }} />;
  }

  if (!product) {
    return (
      <Text style={{ flex: 1, textAlign: 'center', marginTop: 50 }}>
        Error loading product
      </Text>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check this product: ${product.title} - Rs.${product.price}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

// Add to Cart API Call
const updateCartAPI = async (newQty: number) => {
  try {
    const formData = new FormData();
    formData.append("action", "add"); // 🔥 important
    formData.append("user_id", String(userId));
    formData.append("product_id", String(product.id));
    formData.append("quantity", String(newQty));

    const res = await fetch(
      "https://tarunbansal.co.in/android/react/add_to_cart.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const text = await res.text(); // first read raw text
    console.log("Raw API response:", text);

    const data = JSON.parse(text); // then parse JSON

    if (data.status === "success") {
      console.log("Cart updated on server");
    } else {
      Alert.alert("Error", data.message || "Failed to update cart");
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Unable to connect to server");
  }
};


  const handleAddToCart = () => {
    setQuantity(1);
    setCartCount(cartCount + 1);
    updateCartAPI(1);
  };

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    setCartCount(cartCount + 1);
    updateCartAPI(newQty);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      setCartCount(cartCount - 1);
      updateCartAPI(newQty);
    }
  };

  const similarProducts = Array.from({ length: 6 }, (_, i) => ({
    id: i.toString(),
    title: `Similar ${i + 1}`,
    price: `Rs.${(Math.random() * 100 + 50).toFixed(0)}`,
    image: product.image,
  }));

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= Math.floor(rating) ? 'star' : 'star-outline'}
          size={18}
          color="#FFD700"
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.appName}>MyShop</Text>
        <View style={styles.topIcons}>
          <TouchableOpacity style={{ marginRight: 20 }}>
            <Ionicons name="person-circle-outline" size={28} color="#fff" />
          </TouchableOpacity>

          {/* Cart navigation */}
          <TouchableOpacity onPress={() => router.push('/cart')}>
            <Ionicons name="cart-outline" size={28} color="#fff" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Product Image */}
        <Image source={{ uri: product.image }} style={styles.image} />

        {/* Rating */}
        <View style={styles.ratingRow}>
          <View style={{ flexDirection: 'row' }}>
            {renderStars(product.rating?.rate || 0)}
          </View>
          <Text style={styles.ratingText}>({product.rating?.count || 0})</Text>
        </View>

        {/* Product Title */}
        <Text style={styles.title}>{product.title}</Text>

        {/* Product Description */}
        <Text style={styles.description}>{product.description}</Text>

        {/* Company Card */}
        <TouchableOpacity style={styles.companyCard}>
          <Ionicons
            name="business-outline"
            size={28}
            color="#333"
            style={{ marginRight: 10 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.companyName}>Example Pvt. Ltd.</Text>
            <Text style={styles.companySub}>Explore more products</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={22} color="#555" />
        </TouchableOpacity>

        {/* Wishlist + Share */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="heart-outline" size={24} color="#000" />
            <Text>Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
            <Ionicons name="share-outline" size={24} color="#000" />
            <Text>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Similar Products */}
        <Text style={styles.sectionTitle}>Similar Products</Text>
        <FlatList
          horizontal
          data={similarProducts}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.similarCard}>
              <Image source={{ uri: item.image }} style={styles.similarImage} />
              <Text numberOfLines={1} style={styles.similarTitle}>
                {item.title}
              </Text>
              <Text style={styles.similarPrice}>{item.price}</Text>
            </View>
          )}
        />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomPrice}>Rs. {product.price}</Text>
        {quantity === 0 ? (
          <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
            <Ionicons name="cart-outline" size={20} color="#fff" />
            <Text style={styles.cartBtnText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityBox}>
            <TouchableOpacity onPress={handleDecrease} style={styles.qtyBtn}>
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyNumber}>{quantity}</Text>
            <TouchableOpacity onPress={handleIncrease} style={styles.qtyBtn}>
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#F26279',
  },
  appName: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  topIcons: { flexDirection: 'row', alignItems: 'center' },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  cartBadgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: { fontSize: 13, marginLeft: 4, color: 'gray' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },

  companyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
    width: '100%',
  },
  companyName: { fontSize: 15, fontWeight: 'bold', color: '#222' },
  companySub: { fontSize: 12, color: 'gray' },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionBtn: { alignItems: 'center' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  similarCard: {
    width: 120,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
    alignItems: 'center',
    elevation: 2,
  },
  similarImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  similarTitle: { fontSize: 13, fontWeight: '500', textAlign: 'center' },
  similarPrice: { fontSize: 12, color: '#FF5722', marginTop: 3 },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  bottomPrice: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  cartBtn: {
    flexDirection: 'row',
    backgroundColor: '#F26279',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cartBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 6 },

  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F26279',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  qtyBtn: { paddingHorizontal: 10 },
  qtyText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  qtyNumber: { color: '#fff', fontSize: 16, marginHorizontal: 8, fontWeight: 'bold' },
});
