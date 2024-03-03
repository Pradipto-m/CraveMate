/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { color } from './themes';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom } from './contexts/userStore';
import { cartAtom, fetchUserCart } from './contexts/cartStore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import HomePage from './components/screens/home';
import MenuScreen from './components/screens/menu';
import ProfileSection from './components/screens/profile';
import CartSection from './components/screens/cart';

const TabRoutes = () => {
    const Tab = createMaterialBottomTabNavigator();
    const Dark = useColorScheme() === 'dark';
    const [user] = useAtom(userAtom);
    const [cart] = useAtom(cartAtom);
    const fetchCart = useSetAtom(fetchUserCart);

  useEffect(() => {
    // cart data
    const getUserCart = async () => {
      await fetchCart(user._id)
      .catch((err) => console.log(err));
    };
    getUserCart();
  }, [fetchCart, user._id]);

    return (
      <Tab.Navigator
      initialRouteName="Home"
      labeled={false}
      barStyle={{backgroundColor: Dark ? color.bottomTabsDark : color.bottomTabsLight, position: 'absolute', marginBottom: -5, zIndex: 100}}
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
          component={MenuScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (
              focused ? <Ionicons name="list" size={31} color={color.contrastLight} style={{marginTop: -4}} />
              : <Feather name="menu" size={28} color={Dark ? color.contrastLight : color.contrastDark} />
            ),
          }}
        />
        <Tab.Screen name="Cart"
          component={CartSection}
          options={{
            tabBarLabel: '',
            tabBarBadge: cart.products.length > 0 ? cart.products.length : undefined,
            tabBarIcon: ({ focused }) => (
              focused ? <Ionicons name="cart" size={31} color={color.contrastLight} style={{marginTop: -4}} />
              : <Feather name="shopping-cart" size={28} color={Dark ? color.contrastLight : color.contrastDark} />
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
      </Tab.Navigator>
    );
};

export default TabRoutes;
