import { SafeAreaView, StyleSheet, Text, View, Animated, TouchableOpacity, Image, Dimensions, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { saveCart } from '../../Reducer/cart';
import { getAllCarts, getMyCarts } from '../../Services/ProductService';
import { useSelector } from 'react-redux';

const Cart: React.FC = (props) => {
  const cart = useSelector((state: any) => state.cartReducer.cart); // Accessing the products from the state
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  useEffect(() => {
    getMyCart();
  }, []);

  const getMyCart = async()=>{
    const data =  await getMyCarts(1);
    console.log("datacartCART",data )
      dispatch(saveCart(data)); 
  };

  const componentCart = (item: any) => (
    <View style={{
           
    }}>
        <TouchableOpacity style={{
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center',
            padding:10,
            backgroundColor:'#fff',
            marginBottom:10
        }}>
             <Image 
             source={{ uri: item.thumbnail }}
             style={{
              width:width/3,
              height:height/8,
              resizeMode:'contain'}} 
             />
             <View style={{
                marginLeft:10,
                justifyContent:'space-between',
                height: height / 10,
                width: width / 2
             }}>
                 <Text  style={{
                        fontWeight:'bold',
                        fontSize:13,
                        // color:'#7534E0'
                    }}>{item.title}</Text>
                 <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    width: 200
                 }}>
                    <Text style={{
                        fontWeight:'bold',
                        fontSize: width / 25,
                        color:'#7534E0'
                    }}>$ {item.price}</Text>
                    <Text style={{
                        fontWeight:'bold',
                        fontSize: width / 25
                        // color:'#7534E0'
                    }} >Qty 1</Text>
                 </View>
             </View>
        </TouchableOpacity>
        
    </View>
  );

  return (
    <SafeAreaView>
           <View style={styles.containerHeader}>
            <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                padding:10
            }}>
              <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.searchContainer}>
                  <Icon name={'arrow-back-outline'} size={32} color={'#8e8e93'} />;
              </TouchableOpacity>
              <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
            }}>
                <Text style={{
                    fontSize:20,
                    fontWeight:'bold'
                }}>My Cart</Text>
                <Icon name={'cart-outline'} size={32} color={'#7534E0'} />;
              </View>
              <View style={{width:20}}/>
            </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}>
            <FlatList
              data={cart.carts[0]['products'] || []} // Ensure the data is an array (fallback to empty array)
              renderItem={({ item }) => componentCart(item)} 
              keyExtractor={(item) => item.id} // Use a unique ID for the key
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<Text style={styles.emptyText}>No products available</Text>} // Optional: Empty list fallback
              onEndReachedThreshold={0.5} 
              ListFooterComponent={   <View style={{height: 100}}/>}
            />
            <View style={{
              height: 100
            }}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart

const styles = StyleSheet.create({
    containerHeader:{
        backgroundColor: '#fff',
        marginBottom: 12,
      },
    
      searchContainer: {
        alignItems: 'center',
    
        padding: 8,
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
})

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
