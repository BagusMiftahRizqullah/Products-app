import { SafeAreaView, StyleSheet, Text, View, Animated, TouchableOpacity, Image, Dimensions, FlatList, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { addToCart } from '../../Services/ProductService';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const DetailProduct: React.FC<DetailProductProps> = (props) => {
    const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const scale = useRef(new Animated.Value(1)).current;
  
    const handleAddToCart = async() => {
      // Reset position and scale before animating
      position.setValue({ x: 0, y: 0 });
      scale.setValue(1);
  
      // Animation Sequence
      Animated.sequence([
        Animated.parallel([
          Animated.timing(position, {
            toValue: { x: 200, y: -300 }, // Gerakan ke keranjang
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0.5, // Mengecil saat mendekati keranjang
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(300), // Memberi jeda sebelum reset
        Animated.parallel([
          Animated.timing(position, {
            toValue: { x: 0, y: 0 }, // Balik ke posisi awal
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1, // Skala kembali normal
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ]).start();

      console.log("selectedPRODUCT",props.route.params.id)
      // Tambahkan produk ke keranjang Service
      const body={
        userId: 1,
        products: [
          {
            id: props.route.params.id,
            quantity: 1,
          }
        ]
      }
      await addToCart(body);
    };

  console.log("propsDETAIL",props)
  return (
    <SafeAreaView style={{
      flex:1,
    }}>
     <View style={{
      justifyContent:'space-between',
      flexDirection: 'column',
     }}>
       {/* Header */}
        <View style={styles.containerHeader}>
              <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.searchContainer}>
                  <Icon name={'arrow-back-outline'} size={32} color={'#8e8e93'} />;
              </TouchableOpacity>
              <View style={styles.iconHeadContainer}>
                <TouchableOpacity>
                  {/* jika like */}
                  {/* <Icon name={'heart'} size={32} color={'#7534E0'} />; */}
                  {/* jika tidak */}
                  <Icon name={'heart-outline'} size={32} color={'#7534E0'} />;
                </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name={'cart-outline'} size={32} color={'#7534E0'} />;
                </TouchableOpacity>
              </View>
        </View>
          <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false} style={{
              padding: 12,
            height:height / 1.3
          }}>  
            <View style={{alignItems:'center'}}>
            <View style={{
              zIndex:1000,
              position:'absolute',
              right:10,
              top:10,
              justifyContent:'center',
              flexDirection:'row',
              backgroundColor: props.route.params.availabilityStatus.includes('In Stock') ?  '#4caf50' : props.route.params.availabilityStatus.includes('Low Stock') ? '#ffcc00' : '#4caf50',
              width: 80,
              borderRadius:10
            }}>
                <Text style={styles.textStatus}>{`${props.route.params.availabilityStatus}`}</Text>
              </View>
            <FlatList
              style={{
                marginBottom: 12,
              }}
              data={props.route.params.images}
              renderItem={({ item }) => {
                return(
                  <Image
                  source={{ uri: item }}
                  style={{  width: width , height:height / 2.5, alignSelf:'center'}} 
                  resizeMode="cover"
                  /> 
                )
              }} 
              keyExtractor={(item) => item.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
          
              />
              {/* Animasi */}
              <Animated.View
                style={[
                  styles.animatedView,
                  {
                    transform: [
                      { translateX: position.x },
                      { translateY: position.y },
                      { scale },
                    ],
                  },
                ]}
              >
                <Image
                  source={{ uri: props.route.params.images[0] }} // Ambil gambar pertama
                  style={{  width: width , height:height / 2.5, alignSelf:'center'}} 
                  resizeMode="cover"
                />
              </Animated.View>
            </View>
            <View>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 20
            }}>{props.route.params.title}</Text>

            <View style={{
              flexDirection:'row',
            
            }}>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: '#7534E0',
                paddingRight: 10
              }}>{`$${props.route.params.price}`}</Text>
              <View style={{
                  zIndex:1000,
                  justifyContent:'center',
                  flexDirection:'row',
                  backgroundColor: '#ffcc00',
                  padding: 2,
                  borderRadius:10
                }}>
                <Icon name={'pricetag-outline'} size={22} color={'#fff'} />;
                <Text style={styles.textDiscount}>{`${props.route.params.discountPercentage}%`}</Text>
              </View>
            </View>

            <View style={{
              flexDirection:'row',
              alignItems:'center',
            }}>
            <Icon name={'car-outline'} size={32} color={'#7534E0'} />;
            <Text style={{
              marginLeft: 10,
              fontWeight: 'bold',
              fontSize: 16
            }}>{props.route.params.shippingInformation}</Text>
            </View>

            {/* Description */}
            <View>
              <Text style={{
                marginTop: 12,
                fontWeight: 'bold',
                fontSize: 18
              }}>Description</Text>
              <Text style={{
                textAlign: 'justify',
                marginTop: 12,
                fontSize: 16
              }}>{props.route.params.description}</Text>
            </View>

            {/* Reviews */}
            <View>
              <View style={{
                flexDirection:'row',
                justifyContent:'flex-start',
                marginTop: 12
              }}>
                <Text style={{
      
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>Reviews</Text>
                <View style={{
                  justifyContent:'center',
                  flexDirection:'row',
                  alignItems:'center',
                  marginLeft: 10
                }}>
                  <Icon name={'star'} size={21} color={'#ffcc00'} />
                  <Text style={{
                    alignItems:'center',
                    fontSize: 16
                  }}>{props.route.params.rating}</Text>
                </View>
              
            

              </View>
              {
                  props.route.params.reviews.map((item: any) => (
                    <View key={item.id} style={{
                      marginVertical: 8,
                      backgroundColor: '#fff',
                      padding: 12,
                      flexDirection:'column',
                      borderRadius:10
                    
                    }}>
                      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View>
                      {/* name */}
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{
              
                        fontWeight: 'bold',
                        fontSize: 18
                      }}>{item.reviewerName}</Text>
                        {/* Rating */}
                        <View style={{
                          flexDirection:'row',
                          justifyContent:'flex-start',
                          alignItems:'center',
                          marginLeft: 10
                        }}>
                      <Icon name={'star'} size={21} color={'#ffcc00'} />
                      <Text style={{
                        alignItems:'center',
      
                        fontSize: 16
                      }}>{item.rating}</Text>
                        </View>
                        </View>
                      <Text style={{
                        
                        fontWeight: 'bold',
                        fontSize: 16
                      }}>{item.reviewerEmail}</Text>
                      </View>
                      <View>
                      <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16
                      }}>{moment(item.date).format('DD-MM-YYYY')}</Text>
                  
                      </View>
                    
                      </View>
                    
                    
                      <Text style={{
                        marginTop: 12,
                        fontSize: 16
                      }}>{item.comment}</Text>
                    </View>
                  ))
                }
            </View>
                
          <View style={{
                  height: 100
                }}/>
          </View>
          </ScrollView>

        {/* Button cart and buy */}
       
          <View style={{
            height: 100,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            backgroundColor: '#fff',
            
          
          }}>
            <TouchableOpacity onPress={handleAddToCart} style={{
              backgroundColor: '#7534E0',
              paddingVertical: 26,
              width: '50%',
              alignItems:'center'
            }}>
              <View style={{
                  flexDirection:'row',
                  alignItems:'center',
                 justifyContent:'space-between'
              }}>
              <Icon name={'cart'} size={21} color={'#fff'} />
                <Text style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 16,
                
                }}>Add to cart</Text>

              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{
              backgroundColor: '#ffcc00',
              paddingVertical: 26,
              width: '50%',
              alignItems:'center'
            }}>
              <Text style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16
              }}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
};

export default DetailProduct;

const styles = StyleSheet.create({
  containerHeader:{
    backgroundColor: '#fff',
    justifyContent:'space-between',
    flexDirection: 'row',
    alignItems: 'center',
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
    textStatus: {
      fontWeight:'bold',
      fontSize: 18,
      color: '#fff',
    },
    textDiscount: {
      marginLeft: 5,
      fontWeight:'bold',
      fontSize: 15,
      color: '#fff',
    },
    animatedView: {
      position: 'absolute', // Letakkan di atas komponen lain
      top: height / 90, // Mulai dari posisi tengah layar (contoh)
      left: width / 110, // Menyesuaikan posisi horizontal
      zIndex: 10000, // Pastikan elemen ini berada di atas
    },
    animatedImage: {
      width: width / 2,
      height: height / 4,
      borderRadius: 10,
    },
})