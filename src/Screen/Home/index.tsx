import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const scrollViewRef = useRef<ScrollView>(null);
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const BannerPromo = React.lazy(() => import('../../Component/Slider/Slider'));
const ProductComponent = React.lazy(() => import('../../Component/Product/Product'));
const ProductPromo = React.lazy(() => import('../../Component/Promos/Promos'));
const Home: React.FC = (props) => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (event: any) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    setScrollY(contentOffsetY); // Store the current scroll position
  };
  const data = [
    { id: 1, title: 'Promos 1' },
    { id: 2, title: 'Promos 2' },
    { id: 3, title: 'Promos 3' },
    { id: 4, title: 'Promos 4' },
    { id: 5, title: 'Promos 5' },
  ];

  const dataProduct = [
    { id: 1, title: 'Product 1' },
    { id: 2, title: 'Product 2' },
    { id: 3, title: 'Product 3' },
    { id: 4, title: 'Product 4' },
    { id: 5, title: 'Product 5' },
    { id: 6, title: 'Product 6' },
  ];

  const scrollToTop = () => {
    // Scroll to top of the ScrollView
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const goToProductScreen = () => {
    // Scroll to top of the ScrollView
      console.log("goToProductScreen",props.navigation.navigate('ProductsScreen'))
      // props.navigation.navigate('Products')
  };

  return (
    <SafeAreaView style={{
      flex:1,
      padding: 12,
    }}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll} // Handle scroll events
       showsVerticalScrollIndicator={false} style={{
        flex:1,
      }}>
      {/* Header */}
      <View style={styles.containerHeader}>
          <TouchableOpacity onPress={goToProductScreen} style={styles.searchContainer}>
              <Icon name={'search-outline'} size={24} color={'#8e8e93'} />;
              <Text style={{marginLeft: 8}}>Search Product</Text>
          </TouchableOpacity>
          <View style={styles.iconHeadContainer}>
              <TouchableOpacity>
                <Icon name={'cart-outline'} size={32} color={'#7534E0'} />;
             </TouchableOpacity>
             <TouchableOpacity>
              <Icon name={'notifications-outline'} size={32} color={'#7534E0'} />;
             </TouchableOpacity>
          </View>
      </View>

      {/* Component Location */}
      <View>
          <TouchableOpacity style={styles.componentLocation}>
            <Icon name={'location-outline'} size={32} color={'#FFFFFF'} />
            <Text style={styles.textSmall}>Jakarta, Indonesia</Text>
          </TouchableOpacity>

          {/* crausel Promos */}
          <BannerPromo data={data} />
      </View>

        {/* Promos Product */}
        <ProductPromo data={data} />

        {/* List Product */}
        <ProductComponent data={dataProduct} />


      {/* Gap */}
      <View style={{height: 100}}/>
      </ScrollView>
      {
        scrollY > 250 ? (
        <TouchableOpacity onPress={()=> scrollToTop()} style={{
          position: 'absolute',
          bottom: height / 9,
          right: 12,
          
          zIndex: 1000
        }}>
            <Icon name={'arrow-up-circle-sharp'} size={50} color={'#7534E0'} />
        </TouchableOpacity>
        ) : null
      }
        
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  containerHeader:{
    justifyContent:'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  searchContainer: {
    backgroundColor: '#D3D3D3',
    padding: 8,
    width: '70%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  iconHeadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
     width: '30%',
    },
  componentLocation: {
    backgroundColor: '#7534E0',
    padding: 6,
    alignItems: 'center',
    width: '100%',
    borderRadius:18,
    justifyContent: 'flex-start',
    flexDirection: 'row', 
    marginBottom: 12
  },
 
  textSmall: {
    color: '#fff',
    fontSize: 16,
  },
  containerPromos:{
    justifyContent:'space-between',
    flexDirection:'row',
    marginVertical: 12,
    alignItems: 'center',
  },
  textPromos:{
    fontSize: 23,
    color: '#7534E0',
  },
});
