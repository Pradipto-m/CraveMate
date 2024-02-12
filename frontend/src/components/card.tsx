/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Dimensions, SafeAreaView, useColorScheme, Pressable, Image, ToastAndroid } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom } from '../contexts/userStore';
import { productAtom } from '../contexts/productStore';
import { addToCart } from '../contexts/cartStore';
import { color } from '../themes';
import Feather from 'react-native-vector-icons/Feather';
import { addons } from '../utils';

const W = Dimensions.get('window').width;
const H = 300;

const MenuCard = ({route}: any) => {

  const Dark = useColorScheme() === 'dark';
  const id = route.params;
  const [product] = useAtom(productAtom);
  const item = product.find((i) => i._id === id);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const Animation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [-H, 0, H],
        [1, 1, 0]
      ),
      transform: [{
        translateY: interpolate(
          scrollOffset.value,
          [-H, 0, H, H],
          [-H / 2, 0, H * 0.65]
        ),
      }],
    };
  });

  const [user] = useAtom(userAtom);
  const addCart = useSetAtom(addToCart);

  const cartBtn = async () => {
    // Add to cart
    await addCart(user._id, item?._id!);
    ToastAndroid.show('Added to cart', ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView style={{backgroundColor: Dark ? color.primaryDark : color.primaryLight, minHeight: '100%'}}>
      {/* Floating action buttons */}
      <Pressable
        className="flex-row items-center justify-between px-3 w-32 h-16 rounded-3xl absolute z-50 bottom-8 right-8"
        style={{backgroundColor: Dark ? color.secondaryDark : color.secondaryLight}}
        onPress={cartBtn}
      >
        <Feather name="shopping-cart" size={25} color="white" />
        <Text className="font-bold text-white">Add to cart</Text>
      </Pressable>
      <View
      className="justify-center items-center w-16 h-16 rounded-full absolute z-50 top-5 right-5"
      style={{backgroundColor: Dark ? color.contrastDark : color.contrastLight}}
      >
        <Text className="text-xl font-semibold" style={{color: Dark ? color.contrastLight : color.primaryDark}} >👌{item?.rating}</Text>
      </View>
      {/* Reanimated scroll effect */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Animated.Image
        source={{ uri: item?.img }}
        style={[Animation, {width: W, height: H, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, resizeMode: 'cover'}]}
        />
        <View className="mx-4">
          <Text className="text-2xl font-bold mt-3" style={{color: Dark ? color.contrastLight : color.primaryDark}}>{item?.name}</Text>
          <Text className="text-xl font-semibold mt-6" style={{color: Dark ? color.contrastLight : color.primaryDark}}>By {item?.restaurant}</Text>
          <Text className="text-lg mt-7" style={{color: Dark ? color.contrastLight : color.primaryDark}}>{item?.desc}</Text>
          <Text className="text-lg" style={{color: Dark ? color.contrastLight : color.primaryDark}}>{item?.desc}</Text>
          <View className="flex-row justify-between mt-10">
            <View className="w-24 h-14 items-center justify-center rounded-2xl" style={{backgroundColor: Dark ? color.contrastDark : color.contrastLight}}>
              <Text className="text-2xl font-bold" style={{color: Dark ? color.contrastLight : color.primaryDark}}>₹{item?.price}</Text>
            </View>
            <View>{item?.genre.map((cat, i) => (<Text key={i}>{cat}</Text>))}</View>
          </View>
        </View>
        {/* AddOns */}
        <View className="mx-4 mt-9">
          <Text className="text-center text-2xl font-semibold mb-6" style={{color: Dark ? color.contrastLight : color.primaryDark}}>Addons:</Text>
          {addons.map((addon, i) => (
            <View
            key={i}
            className="rounded-full mb-5"
            style={{backgroundColor: Dark ? color.contrastDark : color.contrastLight}}
            >
              <View className="flex-row justify-between items-center">
                <Image source={{uri: addon.img}} className="w-20 h-20 rounded-full"/>
                <Text className="flex-1 mx-2" style={{color: Dark ? color.contrastLight : color.primaryDark, lineHeight: 17}}>{addon.name}</Text>
                <View
                className="flex-row justify-center items-center h-20 w-20 rounded-full"
                style={{backgroundColor: Dark ? color.secondaryDark : color.secondaryLight}}
                >
                  <Feather name="plus" size={26} color={'white'}/>
                </View>
              </View>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default MenuCard;
