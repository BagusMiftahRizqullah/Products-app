import React from 'react';
import { View, Text , StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {
    Home,
    Products,
    SplashScreen,
  } from './Screen';

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();


const Router: React.FC = () => {
    return (
    <NavigationContainer initialState={{ index: 0, routes: [{ name: 'SplashScreen' }] }}>
            <Stack.Navigator>
              <Stack.Screen options={{
                      headerShown: false,
  
                  }} name="SplashScreen" component={SplashScreen} />
                <Stack.Screen options={{
                            headerShown: false,
    
                        }} name="bottomTabs" component={bottomTabs} />


            </Stack.Navigator>
    </NavigationContainer>
    );


    function bottomTabs() {
        return (
            <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: styles.tabBar,
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }) => {
                let iconName;
                if (route.name === 'HomeScreen') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'ProductsScreen') {
                  iconName = focused ? 'storefront' : 'storefront-outline';
                } 
                return(
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 10
                  }}>
                     <Icon name={iconName} size={24} color={focused ? '#7534E0' : '#8e8e93'} />;
                  </View>
                )
              },
            })}
          >
            <Tab.Screen name="HomeScreen" component={Home} />
            <Tab.Screen name="ProductsScreen" component={Products} />
          </Tab.Navigator>
        );
      }
     
  };

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabBar: {
    
      marginHorizontal: 20,
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      borderRadius: 15,
      height: 60,
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 5,
    },
  });


  export default Router;