import { Ionicons } from '@expo/vector-icons';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const categories = [
    { name: 'All' },
    { name: 'Electronics' },
    { name: 'Beauty' },
    { name: 'Decor' },
    { name: 'Kids' },
    { name: 'Gifting' },
    { name: 'Premium' },
  ];

  const cards = [
    { title: 'Big Sale', color: '#FFC107', image: 'https://via.placeholder.com/100' },
    { title: 'New Arrivals', color: '#03A9F4', image: 'https://via.placeholder.com/100' },
    { title: 'Top Picks', color: '#8BC34A', image: 'https://via.placeholder.com/100' },
  ];

  const products = Array.from({ length: 10 }, (_, i) => ({
    id: i.toString(),
    name: `Product ${i + 1}`,
    price: `$${(Math.random() * 50 + 10).toFixed(2)}`,
    image: 'https://via.placeholder.com/80',
  }));

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
      <Ionicons name="cart-outline" size={24} color="#000" />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Scrollable main content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Background Header */}
        <ImageBackground
          source={{ uri: 'https://via.placeholder.com/400x200' }}
          style={styles.header}
        >
          <View style={styles.topBar}>
            <Text style={styles.companyName}>My Company</Text>
            <TouchableOpacity>
              <Image
                source={{ uri: 'https://via.placeholder.com/40' }}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#888" />
            <TextInput placeholder="Search products..." style={styles.searchInput} />
          </View>
        </ImageBackground>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat, index) => (
              <TouchableOpacity key={index} style={styles.categoryChip}>
                <Text style={styles.categoryText}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Cards */}
        <View style={styles.cardsContainer}>
          {cards.map((card, index) => (
            <View key={index} style={[styles.card, { backgroundColor: card.color }]}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Image source={{ uri: card.image }} style={styles.cardImage} />
            </View>
          ))}
        </View>

        {/* Products List */}
        <View style={{ padding: 10 }}>
          <Text style={styles.sectionTitle}>Products</Text>
          {products.map((item) => renderProduct({ item }))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#000" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="refresh-outline" size={24} color="#000" />
          <Text>Order Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="grid-outline" size={24} color="#000" />
          <Text>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cart-outline" size={24} color="#000" />
          <Text>Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 180, paddingHorizontal: 15, paddingTop: 40 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  companyName: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 15,
    height: 40,
  },
  searchInput: { flex: 1, marginLeft: 5 },
  categoriesContainer: { marginTop: 15, paddingHorizontal: 10 },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 15,
    marginRight: 10,
  },
  categoryText: { fontSize: 14, color: '#333' },
  cardsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  card: {
    width: 100,
    height: 140,
    borderRadius: 10,
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: { fontWeight: 'bold', fontSize: 14, color: '#fff' },
  cardImage: { width: 60, height: 60, resizeMode: 'contain' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 1,
  },
  productImage: { width: 60, height: 60, marginRight: 10 },
  productName: { fontSize: 16, fontWeight: '500' },
  productPrice: { fontSize: 14, color: '#777' },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: { alignItems: 'center' },
});
