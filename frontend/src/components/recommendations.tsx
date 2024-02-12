/* eslint-disable react-native/no-inline-styles */
import { View, Text, useColorScheme, Dimensions, Image } from 'react-native';
import React from 'react';
import { color } from '../themes';

const Recommendations = () => {
  const Dark = useColorScheme() === 'dark';
  const W = Dimensions.get('window').width;
  return (
    <View className="flex-row flex-wrap justify-center items-center mt-4">
      <Text className="font-bold text-base" style={{color: Dark ? color.contrastLight : color.primaryDark}}>Popular Deals</Text>
      <View className = "flex-col justify-center items-center mb-6 bg-red-500 rounded-2xl h-44" style={{width : W * 0.82}} >
        <Image source={{uri : 'https://www.thomascook.in/blog/wp-content/uploads/2023/09/Must-Try-In-Tamil-Nadu.png'}} className="h-36 rounded-xl" style={{width: W * 0.79, resizeMode:'cover'}} />
        <Text className = "font-bold text-red-50" >Special Snacks</Text>
      </View>
      <View className = "flex-col justify-center items-center mx-6 mb-6 bg-red-500 rounded-xl h-44" style={{width : W * 0.34}} >
        <Image source={{uri : 'https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg'}} className="w-28 h-36 rounded-lg" style={{width: W * 0.30, resizeMode:'cover'}} />
        <Text className = "font-bold text-red-50" >Chowman Chinese</Text>
      </View>
      <View className = "flex-col justify-center items-center mx-7 mb-6 bg-red-500 rounded-xl h-44" style={{width : W * 0.34}} >
        <Image source={{uri : 'https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg'}} className="w-28 h-36 rounded-lg" style={{width: W * 0.30, resizeMode:'cover'}} />
        <Text className = "font-bold text-red-50" >Chowman Chinese</Text>
      </View>
      <View className = "flex-col justify-center items-center mb-6 bg-red-500 rounded-2xl h-44" style={{width : W * 0.82}} >
        <Image source={{uri : 'https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg'}} className="h-36 rounded-xl" style={{width: W * 0.79, resizeMode:'cover'}} />
        <Text className = "font-bold text-red-50" >Special Snacks</Text>
      </View>
    </View>
  );
};

export default Recommendations;
