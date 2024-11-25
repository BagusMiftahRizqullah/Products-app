import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native'
import React,{useState, useEffect} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct, getOneProduct } from '../../Services/ProductService';
import { saveProduct } from '../../Reducer/products';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Products: React.FC = (props) => {
  const navigation = useNavigation(); // Akses navigation
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.productReducer.products); // Accessing the products from the state


//   useEffect(() => {
//     getAllProducts();
//   }, [])

//  async function getAllProducts(){
//     const data =  await getAllProduct();
//     console.log("dataPRODUCTS",data )
//     dispatch(saveProduct(data)); 
//   }

  async function getOneProducts(id_product:number){
    const data =  await getOneProduct(id_product);
    console.log("data DEtail",data )
    goToDetailProductScreen(data)
  }

const goToDetailProductScreen = (data_detail:any) => {
  // Scroll to top of the ScrollView
    navigation.navigate('DetailProductScreen',data_detail)
};


  console.log("products123", products)

  const componentProduct = (item: any) => (
   
      <TouchableOpacity onPress={() => getOneProducts(item.id)} style={styles.containerProduct}>
         <View style={{
          zIndex:1000,
          position:'absolute',
          right:10,
          top:10,
          justifyContent:'center',
          flexDirection:'row',
          backgroundColor: item.availabilityStatus.includes('In Stock') ?  '#4caf50' : item.availabilityStatus.includes('Low Stock') ? '#ffcc00' : '#4caf50',
          width: 80,
          borderRadius:10
        }}>
            <Text style={styles.textStatus}>{`${item.availabilityStatus}`}</Text>
          </View>
      <Image 
      source={{ uri: item.thumbnail }}
      style={{width: width / 3.5, height:height / 8, alignSelf:'center'}} 
      resizeMode="cover"
      />
      <View style={{
        justifyContent:'flex-start'
      }}>
        <Text style={styles.textProduct}>{item.title}</Text>
        <Text style={styles.textPrice}>{`$${item.price}`}</Text>
        <View >
          <View style={{
          alignItems:'center',
          flexDirection:'row'
        }}>
            <Icon name={'star'} size={16} color={'#ffcc00'} />;
            <Text style={styles.textPrice}>{`${item.rating}`}</Text>
          </View>
         
        </View>
      </View>
     
    </TouchableOpacity>
    
  );

  return (
    <SafeAreaView style={{
      flex:1,
      padding: 12,
    }}>
     {/* Header */}
     <View style={styles.containerHeader}>
          <View style={styles.searchContainer}>
              <Icon name={'search-outline'} size={24} color={'#8e8e93'} />;
              <TextInput style={{
              }}/>
          </View>
          <View style={styles.iconHeadContainer}>
             <TouchableOpacity>
              <Icon name={'filter-outline'} size={32} color={'#7534E0'} />;
             </TouchableOpacity>
              <TouchableOpacity>
                <Icon name={'cart-outline'} size={32} color={'#7534E0'} />;
             </TouchableOpacity>
          </View>
      </View>
      <FlatList
          data={products?.products || []} // Ensure the data is an array (fallback to empty array)
          renderItem={({ item }) => componentProduct(item)} 
          keyExtractor={(item) => item.id} // Use a unique ID for the key
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No products available</Text>} // Optional: Empty list fallback
          numColumns={2} // Sets 3 products per row
          columnWrapperStyle={styles.row} // Adds spacing between rows
          onEndReachedThreshold={0.5} 
          ListFooterComponent={   <View style={{height: 100}}/>}
        />
       
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  containerHeader:{
    justifyContent:'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  searchContainer: {
    alignItems: 'center',
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

    itemContainer: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    itemText: {
      fontSize: 16,
      color: '#333',
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 18,
      color: '#888',
    },
    row: {
      flexDirection: 'row',

    },
    containerProduct:{
      width: 190,
     
      padding:8,
      backgroundColor:'#fff',
      flexDirection:'column',
      justifyContent:'center',
      margin:2,
      borderRadius:10
      
    },
    textProduct: {
      fontSize: 16,
      color: '#000',
      alignSelf: 'flex-start'
    },
    textPrice: {
      fontWeight:'bold',
      fontSize: 16,
      color: '#000',
      alignSelf: 'flex-start'
    },
    textStatus: {
      fontWeight:'bold',
      fontSize: 14,
      color: '#fff',
    },
  
})