import React, { useEffect, useRef } from 'react'
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import {ProductExample} from '../../../assets/images';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
interface DataItem {
    id: number;
    title: string;
  }
  // Define the props type for the Slider component
  interface ProductProps {
    data: DataItem[]; // Array of DataItem objects
  }

const Product: React.FC<ProductProps> = ({ data }) => {
  return (
    <View>
    <TouchableOpacity style={styles.containerPromos}>
      <Text style={styles.textPromos}>Product</Text>
      <Icon name={'chevron-forward-outline'} size={26} color={'#7534E0'} />
    </TouchableOpacity>
    <View>
      <FlatList
      style={{
        marginBottom: 12,
      }}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.containerProduct}>
            <Image source={ProductExample } style={{width: width / 3.3, height:height / 8}} />
            <Text style={styles.textProduct}>{item.title}</Text>
            <View style={{
              flexDirection: 'column',
              alignItems:'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ 
              fontSize: 12, 
              color: '#000000', 
              textDecorationLine:'line-through'
            }}
              >Rp. 20.000</Text>
            <Text style={{
              fontSize: 12,
              color: '#7534E0',
            }}>Rp. 10.000</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3} // Sets 3 products per row
        columnWrapperStyle={styles.row} // Adds spacing between rows
      />
    </View>
  </View>
  )
}

export default Product

const styles = StyleSheet.create({
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
      containerProduct:{
        padding:1,
        backgroundColor:'#fff',
        flexDirection:'column',
        justifyContent:'center',
        margin:2,
        borderRadius:10
        
      },
      textProduct: {
        fontSize: 16,
        color: '#000',
        alignSelf: 'center'
      },
      row: {
        flexDirection: 'row',
        
      },
})