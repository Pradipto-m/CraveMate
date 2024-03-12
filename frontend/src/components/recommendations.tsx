/* eslint-disable react-native/no-inline-styles */
import { View, Text, useColorScheme, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import { color } from '../themes';

const Recommendations = () => {
  const Dark = useColorScheme() === 'dark';
  const W = useWindowDimensions().width;
  return (
    <View className="flex-row flex-wrap justify-center items-center mt-4">
      <Text className="font-bold text-base" style={{color: Dark ? color.contrastLight : color.primaryDark}}>Popular Deals</Text>
      <View className = "flex-col justify-center items-center mb-6 bg-red-500 rounded-2xl h-44" style={{width : W * 0.82}} >
        <Image source={{uri : 'https://www.thomascook.in/blog/wp-content/uploads/2023/09/Must-Try-In-Tamil-Nadu.png'}} className="h-36 rounded-xl" style={{width: W * 0.79, resizeMode:'cover'}} />
        <Text className = "font-bold text-red-50" >Special Feast</Text>
      </View>
      <View className = "flex-col justify-center items-center mx-6 mb-6 bg-red-500 rounded-xl h-44" style={{width : W * 0.34}} >
        <Image source={{uri : 'https://plus.unsplash.com/premium_photo-1673581152308-591c1645be02'}} className="w-28 h-36 rounded-lg" style={{width: W * 0.30, resizeMode:'cover'}} />
        <Text className = "font-bold text-red-50" >Chinese Wow!</Text>
      </View>
      <View className = "flex-col justify-center items-center mx-7 mb-6 bg-red-500 rounded-xl h-44" style={{width : W * 0.34}} >
        <Image source={{uri : 'https://img.freepik.com/free-photo/delicious-asian-noodles-concept_23-2148773773.jpg'}} className="w-28 h-36 rounded-lg" style={{width: W * 0.30, resizeMode:'cover'}} />
        <Text className = "font-bold text-red-50" >Chinese Wow!</Text>
      </View>
      <View className = "flex-col justify-center items-center mb-6 bg-red-500 rounded-2xl h-44" style={{width : W * 0.82}} >
        <Image source={{uri : 'https://images.unsplash.com/photo-1550367363-ea12860cc124'}} className="h-36 rounded-xl" style={{width: W * 0.79, resizeMode:'cover'}} />
        <Text className = "font-bold text-red-50" >Bonanza Party</Text>
      </View>
    </View>
  );
};

export default Recommendations;
