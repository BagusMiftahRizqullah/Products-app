import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { getAllProduct } from '../../Services/ProductService';
import { saveProduct } from '../../Reducer/products';
import { useDispatch } from 'react-redux';

const SplashScreen: React.FC = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllProducts();
    StatusBar.setHidden(true);
  
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
  return (
    <View style={{flex:1,backgroundColor:'#7534E0'}}>
      <Text>SplashScreen</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})
