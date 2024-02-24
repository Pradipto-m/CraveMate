/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, useColorScheme, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom } from '../../contexts/userStore';
import { fetchUserCart } from '../../contexts/cartStore';
import { color } from '../../themes';
import { banner, trending, popular } from '../../utils';
import Recommendations from '../recommendations';

const HomePage = () => {

  const width = useWindowDimensions().width;
  const Dark = useColorScheme() === 'dark';
  const [user] = useAtom(userAtom);
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
    <SafeAreaView style={{backgroundColor: Dark ? color.primaryDark : color.primaryLight}}>
      {/* Header */}
      <View className = "justify-center items-start mx-3 h-[69px]" >
        <Text style={{color: Dark ? color.contrastLight : color.primaryDark, fontSize: 25, fontWeight: 'bold'}} >Welcome to CraveMate, Foodie!</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Carousel */}
        <Animated.View entering={FadeInDown.duration(750)}>
          <Carousel
            loop={true}
            width={width}
            height={width / 1.8}
            autoPlay={true}
            autoPlayInterval={3000}
            scrollAnimationDuration={500}
            data={banner}
            renderItem={({index}) => (
              <View className="justify-center items-center m-3" >
                <Image source={{uri: banner[index]}} className="w-full h-full rounded-2xl" />
              </View>
            )}
          />
        </Animated.View>

        {/* Trending Deals */}
        <View className="flex m-3">
          <Text className="font-bold text-base" style={{color: Dark ? color.contrastLight : color.primaryDark}} >Trending Offers</Text>
        </View>
        <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} entering={FadeInDown.duration(750)} >
          <View className = "flex-row justify-center items-center" >
            {trending.map((item, index) => (
              <View key={index} className = "flex-col justify-center items-center m-3 p-2 bg-red-500 rounded-xl w-32 h-44" >
                <Image source={{uri : item.img}} className="w-28 h-36 rounded-lg" style={{resizeMode:'cover'}} />
                <Text className = "text-base font-bold text-red-50" >{item.desc}</Text>
              </View>
            ))}
          </View>
        </Animated.ScrollView>

        <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} entering={FadeInDown.duration(750)} >
          <View className = "flex-row justify-center items-center" >
            {popular.map((item, index) => (
              <View key={index} className = "flex-col justify-center items-center m-3 bg-red-500 rounded-2xl h-44" style={{width : width * 0.68}} >
                <Image source={{uri : item.img}} className="h-36 rounded-xl" style={{width:width * 0.66, resizeMode:'cover'}} />
                <Text className = "text-base font-bold text-red-50" >{item.desc}</Text>
              </View>
            ))}
          </View>
        </Animated.ScrollView>

        {/* Popular Offers */}
        < Recommendations />

        <View className="flex h-36" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
