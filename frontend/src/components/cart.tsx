/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, SafeAreaView, useColorScheme, ScrollView, ImageBackground, Pressable, Image, ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../themes';
import Feather from 'react-native-vector-icons/Feather';
import { useAtom, useSetAtom } from 'jotai';
import { addToCart, cartAtom, itemsAtom, removeFromCart } from '../contexts/cartStore';
import { userAtom } from '../contexts/userStore';

const EmptyList = () => (
  <View className="items-center">
    <Image source={require('../../assets/empty.png')}/>
    <Text className="font-medium">Your Cart is Empty</Text>
  </View>
);

const OrdersSection = () => {

  const Dark = useColorScheme() === 'dark';
  const [cartItem] = useAtom(itemsAtom);
  const [cart] = useAtom(cartAtom);
  const [user] = useAtom(userAtom);
  const addMore = useSetAtom(addToCart);
  const removeItem = useSetAtom(removeFromCart);

  const addClicked = async (itemId: string) => {
    await addMore(user._id, itemId).catch((err) => {
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
      console.error(err);
    });
  };
  const removeClicked = async (itemId: string) => {
    await removeItem(user._id, itemId).catch((err) => {
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
      console.error(err);
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: Dark ? color.primaryDark : color.primaryLight, minHeight: '100%'}}>
      <View className="flex-row items-center justify-between mx-4 h-16" >
        <Text
        className="text-3xl font-bold text-center"
        style={{color: Dark ? color.contrastLight : color.primaryDark}}
        >{user.username}'s Cart:</Text>
      </View>
      <View className="h-[1.5px] mx-4 bg-slate-700" />
      <ScrollView>
        {cartItem.length !== 0 ? cartItem.map((item, index) => (
          <View key={index} className="flex-row mx-7 mt-7">
            <ImageBackground
            source={{uri: item.img}}
            style={{width: '87%', height: 110, justifyContent: 'flex-start'}}
            >
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={Dark ? [
                  'rgba(65, 78, 90, 0)',
                  'rgba(65, 78, 90, 0.65)',
                  'rgba(65, 78, 90, 1)',
                  'rgba(65, 78, 90, 1)',
                ] : [
                  'rgba(255, 230, 230, 0)',
                  'rgba(255, 230, 230, 0.55)',
                  'rgba(255, 230, 230, 0.95)',
                  'rgba(255, 230, 230, 1)',
                ]
                }
                style={{height: 110, justifyContent: 'center', alignItems: 'flex-end', gap: 3}}
              >
                <Text className="text-xl font-bold mr-2" style={{color: Dark ? color.contrastLight : color.primaryDark}}>{item.name}</Text>
                <Text className="text-xl font-bold mr-2" style={{color: Dark ? color.contrastLight : color.primaryDark}}>{item.restaurant}</Text>
                <Text className="text-xl font-bold mr-2 text-white bg-red-500 px-0.5 rounded-md">₹{item.price * cart.products[index].quantity}</Text>
              </LinearGradient>
            </ImageBackground>
            <View className="flex-col justify-between items-center ml-px w-12 py-1" style={{backgroundColor: Dark ? color.contrastDark : color.contrastLight}}>
              <Pressable onPress={() => addClicked(item._id)}>
                <Feather name="plus-circle" size={26} color={Dark ? color.contrastLight : color.primaryDark} />
              </Pressable>
              <Text className="text-xl font-bold" style={{color: Dark ? color.contrastLight : color.primaryDark}}>{cart.products[index].quantity}</Text>
              <Pressable onPress={() => removeClicked(item._id)}>
                <Feather name="minus-circle" size={26} color={Dark ? color.contrastLight : color.primaryDark} />
              </Pressable>
            </View>
          </View>
        )) : <EmptyList />
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersSection;
