import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const Products: React.FC = () => {
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
    </SafeAreaView>
  )
}

export default Products

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
})