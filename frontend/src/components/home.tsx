/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, Dimensions, useColorScheme } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { color } from '../themes';
import { banner, trending, popular } from '../utils';

const HomePage = () => {

  const width = Dimensions.get('window').width;
  const Dark = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{backgroundColor: Dark ? color.primaryDark : color.primaryLight}}>
      {/* Header */}
      <View className = "justify-center items-start mx-3 h-[69px]" >
        <Text style={{color: Dark ? color.contrastLight : color.primaryDark, fontSize: 25, fontWeight: 'bold'}} >Welcome to CraveMate, Foodie!</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Carousel */}
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

        {/* Trending Deals */}
        <View className="flex m-3">
          <Text className="font-bold text-base" style={{color: Dark ? color.contrastLight : color.primaryDark}} >Trending Offers</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
          <View className = "flex-row justify-center items-center" >
            {trending.map((item, index) => (
              <View key={index} className = "flex-col justify-center items-center m-3 p-2 bg-red-500 rounded-xl w-32 h-44" >
                <Image source={{uri : item.img}} className="w-28 h-36 rounded-lg" style={{resizeMode:'cover'}} />
                <Text className = "text-base font-bold text-red-50" >{item.desc}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
          <View className = "flex-row justify-center items-center" >
            {popular.map((item, index) => (
              <View key={index} className = "flex-col justify-center items-center m-3 bg-red-500 rounded-2xl h-44" style={{width : width * 0.68}} >
                <Image source={{uri : item.img}} className="h-36 rounded-xl" style={{width:width * 0.66, resizeMode:'cover'}} />
                <Text className = "text-base font-bold text-red-50" >{item.desc}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Popular Offers */}
        <View className="flex-row flex-wrap justify-center items-center mt-4">
          <Text className="font-bold text-base" style={{color: Dark ? color.contrastLight : color.primaryDark}}>Popular Deals</Text>
          <View className = "flex-col justify-center items-center mb-6 bg-red-500 rounded-2xl h-44" style={{width : width * 0.82}} >
            <Image source={{uri : 'https://www.thomascook.in/blog/wp-content/uploads/2023/09/Must-Try-In-Tamil-Nadu.png'}} className="h-36 rounded-xl" style={{width:width * 0.79, resizeMode:'cover'}} />
            <Text className = "font-bold text-red-50" >Special Snacks</Text>
          </View>
          <View className = "flex-col justify-center items-center mx-6 mb-6 bg-red-500 rounded-xl h-44" style={{width : width * 0.34}} >
            <Image source={{uri : 'https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg'}} className="w-28 h-36 rounded-lg" style={{width:width * 0.30, resizeMode:'cover'}} />
            <Text className = "font-bold text-red-50" >Chowman Chinese</Text>
          </View>
          <View className = "flex-col justify-center items-center mx-7 mb-6 bg-red-500 rounded-xl h-44" style={{width : width * 0.34}} >
            <Image source={{uri : 'https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg'}} className="w-28 h-36 rounded-lg" style={{width:width * 0.30, resizeMode:'cover'}} />
            <Text className = "font-bold text-red-50" >Chowman Chinese</Text>
          </View>
          <View className = "flex-col justify-center items-center mb-6 bg-red-500 rounded-2xl h-44" style={{width : width * 0.82}} >
            <Image source={{uri : 'https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg'}} className="h-36 rounded-xl" style={{width:width * 0.79, resizeMode:'cover'}} />
            <Text className = "font-bold text-red-50" >Special Snacks</Text>
          </View>
        </View>

        <View className="flex h-14" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
