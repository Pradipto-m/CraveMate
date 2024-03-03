/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, SafeAreaView, useColorScheme, ImageBackground, Pressable, ToastAndroid } from 'react-native';
import { color } from '../../themes';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom } from '../../contexts/userStore';
import { addToCart, cartAtom, itemsAtom, removeFromCart } from '../../contexts/cartStore';
import Animated, { FadeInDown } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EmptyList from '../emptyList';

const CartSection = ({navigation}: any) => {

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
      {/* Floating Order Button */}
      <View className="flex-row absolute z-50 bottom-36 mx-7 rounded-[20px]" style={{bottom: cartItem.length >= 5 ? 148 : 84, backgroundColor: Dark ? 'rgba(65, 78, 90, 0.82)' : 'rgba(255, 230, 230, 0.79)'}}>
        <View className="justify-center px-3">
          <Ionicons name="bag-handle" size={37} color={Dark ? 'floralwhite' : 'dimgray'} />
        </View>
        <View className="flex-1 py-[7px]">
          <Text style={{color: Dark ? color.contrastLight : color.primaryDark}}>Total Amount:</Text>
          <View className="flex-row">
            <Text className="font-bold text-[32px] text-red-400">{cart.amount ? cart.amount : 0}</Text>
            <Text className="text-sm" style={{color: Dark ? color.contrastLight : color.primaryDark}}> *</Text>
          </View>
        </View>
        <Pressable
        className="flex-row justify-center items-center rounded-[20px] w-28"
        style={{backgroundColor: 'rgba(245, 64, 94, 0.8)'}}
        onPress={() => {
          if (cart?.amount !== 0 || cartItem.length !== 0) {
            navigation.navigate('Order');
          }
        }}
        >
          <Text className="font-semibold text-xl text-red-50">Order Now!</Text>
        </Pressable>
      </View>

      <View className="flex-row items-center justify-between mx-4 h-16" >
        <Text
        className="text-3xl font-bold text-center"
        style={{color: Dark ? color.contrastLight : color.contrastDark}}
        >{user.username}'s Cart:</Text>
      </View>
      <View className="h-[1.5px] mx-4 bg-slate-700" />
      <Animated.ScrollView showsVerticalScrollIndicator={false} entering={FadeInDown.duration(700)}>
        {cartItem?.length !== 0 ? cartItem?.map((item, index) => (
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
                <Text className="text-xl font-bold mr-2 text-white bg-red-500 px-0.5 rounded-md">₹{(cart?.products[index]?.quantity || 0) * item.price}</Text>
              </LinearGradient>
            </ImageBackground>
            <View className="flex-col justify-between items-center ml-px w-12 py-1" style={{backgroundColor: Dark ? color.contrastDark : color.contrastLight}}>
              <Pressable onPress={() => addClicked(item._id)}>
                <Feather name="plus-circle" size={26} color={Dark ? color.contrastLight : color.primaryDark} />
              </Pressable>
              <Text className="text-xl font-bold" style={{color: Dark ? color.contrastLight : color.primaryDark}}>{cart?.products[index]?.quantity}</Text>
              <Pressable onPress={() => removeClicked(item._id)}>
                <Feather name="minus-circle" size={26} color={Dark ? color.contrastLight : color.primaryDark} />
              </Pressable>
            </View>
          </View>
        )) : <EmptyList /> }
        < View className="h-[230px]" />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default CartSection;
