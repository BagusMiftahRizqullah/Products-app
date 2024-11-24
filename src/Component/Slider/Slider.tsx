import React, { useEffect, useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// Define the type for each item in the data
interface DataItem {
    id: number;
    title: string;
  }
  // Define the props type for the Slider component
  interface SliderProps {
    data: DataItem[]; // Array of DataItem objects
  }

const Slider: React.FC<SliderProps> = ({ data }) => {
    const flatListRef = useRef<FlatList>(null);
    const scrollX = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
          scrollX.current += width; // Move to the next item
          if (scrollX.current >= data.length * width) {
            scrollX.current = 0; // Reset to the first item
          }
          flatListRef.current?.scrollToOffset({ offset: scrollX.current, animated: true });
        }, 3000); // Scroll every 3 seconds
    
        return () => clearInterval(interval); // Cleanup interval on unmount
      }, [data.length]);


    const renderItem = ({ item }: { item: { title: string } }) => (
        <TouchableOpacity style={styles.item}>
          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
      );
  return (
    <View>
       <FlatList
         ref={flatListRef}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
            horizontal // Enables horizontal scrolling
            showsHorizontalScrollIndicator={false} // Hides the scroll indicator
            contentContainerStyle={styles.list} // Styles the content
          />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 10, // Adds padding to the list
      },
      item: {
        backgroundColor: '#7534E0',
        width:width - 30,
        height:height / 4,
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        color: '#fff',
        fontSize: 23,
      },
});
