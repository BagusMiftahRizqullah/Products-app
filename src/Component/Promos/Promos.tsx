import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import {ProductExample} from '../../../assets/images';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

  // Define the props type for the Slider component
  interface PromosProps {
    data: any[]; // Array of DataItem objects
  }

const Promos: React.FC<PromosProps> = ({ data }) => {

  const goToProductScreen = () => {
    // Scroll to top of the ScrollView
      props.navigation.navigate('ProductsScreen')
  };
  const componentProduct = (item: any) => (
   
    <TouchableOpacity style={styles.containerProduct}>
       <View style={{
        zIndex:1000,
        position:'absolute',
        right:13,
        top:10,
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor: item.availabilityStatus.includes('In Stock') ?  '#4caf50' : item.availabilityStatus.includes('Low Stock') ? '#ffcc00' : '#4caf50',
        width: 70,
        borderRadius:10,
      }}>
          <Text style={styles.textStatus}>{`${item.availabilityStatus}`}</Text>
        </View>
    <Image 
    source={{ uri: item.images[0] }}
    style={{
      width: width / 3.5, 
      height:height / 8, 
      alignSelf:'center'
    }} 
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
       <View>
          <TouchableOpacity onPress={goToProductScreen} style={styles.containerPromos}>
            <Text style={styles.textPromos}>Promo</Text>
            <Icon name={'chevron-forward-outline'} size={26} color={'#7534E0'} />
          </TouchableOpacity>
          <FlatList
          style={{
            marginBottom: 12,
          }}
            data={data}
            renderItem={({ item }) => componentProduct(item)} 
            keyExtractor={(item) => item.id.toString()}
            horizontal // Enable horizontal scrollin
            showsHorizontalScrollIndicator={false}
          />
        </View>
  )
}

export default Promos

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
      row: {
        flexDirection: 'row',
        
      },
      containerProduct:{
        width: 130,
       
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
        fontSize: 12,
        color: '#fff',
      },
})