import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { getAllProduct, getMyCarts, getAllCarts } from '../../Services/ProductService';
import { saveProduct } from '../../Reducer/products';
import { saveCart } from '../../Reducer/cart';
import { useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';

const SplashScreen: React.FC = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    StatusBar.setHidden(true);
    getMyCart();
    getAllProducts();
  
  }, []);

  const getAllProducts = async()=>{
    const data =  await getAllProduct();
    console.log("dataPRODUCTSSPLASH",data )
      dispatch(saveProduct(data)); 
      setTimeout(() => {
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'bottomTabs' }], // Replace 'Home' with the name of your initial screen
        });
    }, 2000);
  };


  const getMyCart = async()=>{
    const data =  await getAllCarts();
    console.log("datacartSPLASH",data )
      dispatch(saveCart(data)); 
  };
  return (
    <View style={{flex:1,backgroundColor:'#7534E0',   alignItems: 'center',
      justifyContent: 'center',}}>
          <LottieView
              source={require('../../../assets/splashScreen.json')}
              autoPlay
              loop
              speed={1}
              style={{
                  width: '100%',
                  height: '60%'
              }}
              />
        <Text style={{
          fontWeight:'bold',
          fontSize: 32,
          color: '#fff',
        }}>Store App</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})
