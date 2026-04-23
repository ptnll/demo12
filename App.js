import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import {
    FlatList,
    Image, ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// --- DỮ LIỆU MẪU ---
const COFFEE_DATA = [
  { id: '1', name: 'Caffe Mocha', type: 'Deep Foam', price: '4.53', rating: '4.8', image: require('./assets/anh1.png') },
  { id: '2', name: 'Flat White', type: 'Espresso', price: '3.53', rating: '4.8', image: require('./assets/anh2.png') },
  //{ id: '3', name: 'Cappuccino', type: 'With Oat Milk', price: '4.20', rating: '4.9', image: require('./assets/image_479f7d.png') },
];

const CATEGORIES = ['All Coffee', 'Machiato', 'Latte', 'Americano'];

// --- MÀN HÌNH 1: ONBOARDING ---
const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('./assets/image_474d5e.png')} 
        style={styles.onboardingImage}
      >
        <View style={styles.onboardingContent}>
          <Text style={styles.obTitle}>Fall in Love with Coffee in Blissful Delight!</Text>
          <Text style={styles.obSubTitle}>Welcome to our coffee corner, where every cup is a journey and every sip is a story.</Text>
          <TouchableOpacity 
            style={styles.buttonMain} 
            onPress={() => navigation.replace('Main')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

// --- MÀN HÌNH 2: HOME ---
const HomeScreen = ({ navigation }) => {
  const [selectedCat, setSelectedCat] = useState('All Coffee');

  const renderCoffeeItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.coffeeCard}
      onPress={() => navigation.navigate('Detail', { product: item })}
    >
      <Image source={item.image} style={styles.coffeeThumb} />
      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>⭐ {item.rating}</Text>
      </View>
      <Text style={styles.coffeeName}>{item.name}</Text>
      <Text style={styles.coffeeType}>{item.type}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.coffeePrice}>$ {item.price}</Text>
        <TouchableOpacity style={styles.btnAddSmall}>
          <Text style={styles.btnAddText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.locationLabel}>Location</Text>
          <Text style={styles.locationText}>Bilzen, Tanjungbalai ∨</Text>
          
          {/* Thanh tìm kiếm và nút filter */}
          <View style={styles.searchRow}>
            <View style={styles.searchContainer}>
              {/* ĐỔI TÊN FILE ICON TÌM KIẾM CỦA BẠN VÀO ĐÂY */}
              <Image source={require('./assets/search.png')} style={styles.searchIcon} />
              <TextInput 
                style={styles.searchInput} 
                placeholder="Search coffee" 
                placeholderTextColor="#989898"
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              {/* ĐỔI TÊN FILE ICON FILTER CỦA BẠN VÀO ĐÂY */}
              <Image source={require('./assets/filter.png')} style={styles.filterIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Promo Banner - Đã đổi sang ImageBackground */}
        {/* ĐỔI TÊN FILE ẢNH BANNER CỦA BẠN VÀO ĐÂY */}
        <ImageBackground 
            source={require('./assets/banner.png')} 
            style={styles.promoBanner}
            imageStyle={{ borderRadius: 16 }}
        >
          {/* <Text style={styles.promoTag}>Promo</Text>
          <Text style={styles.promoTitle}>Buy one get{'\n'}one FREE</Text> */}
        </ImageBackground>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catList}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => setSelectedCat(cat)}
              style={[styles.catItem, selectedCat === cat && styles.catItemActive]}
            >
              <Text style={[styles.catText, selectedCat === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Coffee List */}
        <FlatList
          data={COFFEE_DATA}
          renderItem={renderCoffeeItem}
          keyExtractor={item => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- MÀN HÌNH 3: DETAIL ---
// (Giữ nguyên như cũ)
const DetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [size, setSize] = useState('M');

  return (
    <SafeAreaView style={styles.detailContainer}>
      <ScrollView>
        <Image source={product.image} style={styles.detailImage} />
        <View style={styles.detailInfo}>
          <Text style={styles.detailName}>{product.name}</Text>
          <Text style={styles.detailType}>{product.type}</Text>
          <View style={styles.separator} />
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo... <Text style={styles.readMore}>Read More</Text>
          </Text>
          
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeRow}>
            {['S', 'M', 'L'].map(s => (
              <TouchableOpacity 
                key={s} 
                onPress={() => setSize(s)}
                style={[styles.sizeBox, size === s && styles.sizeBoxActive]}
              >
                <Text style={[styles.sizeText, size === s && styles.sizeTextActive]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerDetail}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>$ {product.price}</Text>
        </View>
        <TouchableOpacity style={styles.buttonBuy}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// --- NAVIGATION CẤU HÌNH ---
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bạn nhớ import thêm View vào đầu file nếu chưa có nhé
// import { View, Image, ... } from 'react-native';

function MainTabs() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({ 
        headerShown: false, 
        tabBarShowLabel: false, // Ẩn chữ đi để giống thiết kế
        tabBarActiveTintColor: '#C67C4E', // Màu cam khi chọn
        tabBarInactiveTintColor: '#A2A2A2', // Màu xám khi không chọn
        tabBarStyle: { 
          height: 80, 
          backgroundColor: 'white',
          borderTopLeftRadius: 24, // Bo tròn góc trái
          borderTopRightRadius: 24, // Bo tròn góc phải
          borderTopWidth: 0, // Bỏ đường viền mặc định
          elevation: 10, // Đổ bóng cho Android
          shadowColor: '#000', // Đổ bóng cho iOS
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          position: 'absolute', // Để thanh tab nổi lên trên nền
          bottom: 0,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconSource;

          // BẠN SỬA LẠI TÊN FILE ICON Ở ĐÂY CHO ĐÚNG VỚI FILE BẠN ĐÃ TẢI NHÉ
          if (route.name === 'Home') {
            iconSource = require('./assets/home_icon.png'); 
          } else if (route.name === 'Favorite') {
            iconSource = require('./assets/heart_icon.png');
          } else if (route.name === 'Cart') {
            iconSource = require('./assets/bag_icon.png');
          } else if (route.name === 'Notification') {
            iconSource = require('./assets/notification_icon.png');
          }

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
              <Image 
                source={iconSource} 
                style={{ width: 24, height: 24, tintColor: color }} 
                resizeMode="contain"
              />
              {/* Dấu gạch ngang màu cam nhỏ ở dưới icon khi được chọn */}
              {/* {focused && (
                <View style={{
                  width: 10, 
                  height: 4, 
                  backgroundColor: '#C67C4E', 
                  borderRadius: 2, 
                  marginTop: 6 
                }} />
              )} */}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorite" component={HomeScreen} />
      <Tab.Screen name="Cart" component={HomeScreen} />
      <Tab.Screen name="Notification" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- STYLESHEET ---
const styles = StyleSheet.create({
  container: { flex: 1 },
  onboardingImage: { flex: 1, justifyContent: 'flex-end' },
  onboardingContent: { padding: 30, backgroundColor: 'rgba(0,0,0,0.4)', paddingBottom: 50 },
  obTitle: { color: 'white', fontSize: 34, fontWeight: 'bold', textAlign: 'center' },
  obSubTitle: { color: '#A9A9A9', textAlign: 'center', marginVertical: 15 },
  buttonMain: { backgroundColor: '#C67C4E', padding: 18, borderRadius: 16 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  
  homeContainer: { flex: 1, backgroundColor: '#F9F9F9' },
  header: { backgroundColor: '#131313', padding: 50, paddingBottom: 60 },
  locationLabel: { color: '#B7B7B7', fontSize: 12 },
  locationText: { color: 'white', fontWeight: 'bold', marginBottom: 20 },
  
  // Styles mới cho thanh tìm kiếm
  searchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  searchContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    backgroundColor: '#313131', 
    borderRadius: 16, 
    alignItems: 'center', 
    paddingHorizontal: 15,
    marginRight: 15,
    height: 50
  },
  searchIcon: { width: 20, height: 20, tintColor: 'white', marginRight: 10 },
  searchInput: { flex: 1, color: 'white', height: '100%' },
  filterButton: { 
    backgroundColor: '#C67C4E', 
    width: 50, 
    height: 50, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  filterIcon: { width: 24, height: 24, tintColor: 'white' },
  
  // Style cho Promo Banner
  promoBanner: { 
    marginHorizontal: 20, 
    marginTop: -40, 
    borderRadius: 16, 
    padding: 20,
    height: 140, // Đặt chiều cao cho banner
    justifyContent: 'center'
  },
  promoTag: { backgroundColor: '#ED5151', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, color: 'white', fontSize: 14, fontWeight: 'bold' },
  promoTitle: { color: 'white', fontSize: 28, fontWeight: 'bold', marginTop: 10, backgroundColor: 'rgba(0,0,0,0.3)', alignSelf: 'flex-start', paddingHorizontal: 5 },
  
  catList: { paddingLeft: 20, marginBottom: 50 },
  catItem: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12, marginRight: 10, backgroundColor: 'white' },
  catItemActive: { backgroundColor: '#C67C4E' },
  catText: { color: '#2F4B4E', fontWeight: '500' },
  catTextActive: { color: 'white', fontWeight: 'bold' },
  
  listContainer: { paddingHorizontal: 15 },
  coffeeCard: { flex: 1, backgroundColor: 'white', margin: 8, borderRadius: 16, padding: 10 },
  coffeeThumb: { width: '100%', height: 130, borderRadius: 12 },
  coffeeName: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  coffeeType: { color: '#9B9B9B', fontSize: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' },
  coffeePrice: { fontSize: 18, fontWeight: 'bold', color: '#2F4B4E' },
  btnAddSmall: { backgroundColor: '#C67C4E', width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  btnAddText: { color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: -2 },
  ratingBadge: { position: 'absolute', top: 15, left: 15, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, flexDirection: 'row', alignItems: 'center' },
  ratingText: { color: 'white', fontSize: 10, fontWeight: 'bold' },

  detailContainer: { flex: 1, backgroundColor: 'white' },
  detailImage: { width: '90%', height: 250, alignSelf: 'center', borderRadius: 20, marginTop: 20 },
  detailInfo: { padding: 25 },
  detailName: { fontSize: 24, fontWeight: 'bold' },
  detailType: { color: '#9B9B9B', marginBottom: 15 },
  separator: { height: 1, backgroundColor: '#EAEAEA', my: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  description: { color: '#9B9B9B', lineHeight: 22 },
  readMore: { color: '#C67C4E', fontWeight: 'bold' },
  sizeRow: { flexDirection: 'row', justifyContent: 'space-between' },
  sizeBox: { flex: 1, borderWidth: 1, borderColor: '#EAEAEA', paddingVertical: 10, borderRadius: 12, marginHorizontal: 5, alignItems: 'center' },
  sizeBoxActive: { borderColor: '#C67C4E', backgroundColor: '#FFF5EE' },
  sizeText: { fontSize: 16, color: '#333' },
  sizeTextActive: { color: '#C67C4E', fontWeight: 'bold' },
  footerDetail: { flexDirection: 'row', justifyContent: 'space-between', padding: 25, borderTopWidth: 1, borderColor: '#F1F1F1', alignItems: 'center' },
  priceLabel: { color: '#9B9B9B', fontSize: 14 },
  priceValue: { fontSize: 24, fontWeight: 'bold', color: '#C67C4E' },
  buttonBuy: { backgroundColor: '#C67C4E', paddingHorizontal: 60, paddingVertical: 18, borderRadius: 16 },
});