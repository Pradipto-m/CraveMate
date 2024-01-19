/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useColorScheme } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { color } from './themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import HomePage from './components/home';
import MenuCard from './components/menu';
import ProfileSection from './components/profile';
import Orders from './components/cart';

const TabRoutes = () => {
    const Tab = createMaterialBottomTabNavigator();
    const Dark = useColorScheme() === 'dark';

    return (
      <Tab.Navigator
      initialRouteName="Home"
      labeled={false}
      barStyle={{backgroundColor: Dark ? color.contrastDark : color.contrastLight, marginBottom: -5}}
      activeIndicatorStyle={{backgroundColor: Dark ? color.secondaryDark : color.secondaryLight, height: 55, width: 80, borderRadius: 50}}
      sceneAnimationEnabled={true}
      shifting={true}
      sceneAnimationType="shifting"
      >
        <Tab.Screen name="Home"
          component={HomePage}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (
              focused ? <Ionicons name="home" size={31} color={color.contrastLight} style={{marginTop: -4}} />
              : <Feather name="home" size={28} color={Dark ? color.contrastLight : color.contrastDark} />
            ),
          }}
        />
        <Tab.Screen name="Menu"
          component={MenuCard}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (
              focused ? <Ionicons name="list" size={31} color={color.contrastLight} style={{marginTop: -4}} />
              : <Feather name="menu" size={28} color={Dark ? color.contrastLight : color.contrastDark} />
            ),
          }}
        />
        <Tab.Screen name="Profile"
          component={ProfileSection}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (
              focused ? <Ionicons name="person" size={31} color={color.contrastLight} style={{marginTop: -4}} />
              : <Feather name="user" size={28} color={Dark ? color.contrastLight : color.contrastDark} />
            ),
          }}
        />
        <Tab.Screen name="Cart"
          component={Orders}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (
              focused ? <Ionicons name="cart" size={31} color={color.contrastLight} style={{marginTop: -4}} />
              : <Feather name="shopping-cart" size={28} color={Dark ? color.contrastLight : color.contrastDark} />
            ),
          }}
        />
      </Tab.Navigator>
    );
};

export default TabRoutes;