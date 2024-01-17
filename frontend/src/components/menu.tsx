/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TextInput, Pressable, useColorScheme } from 'react-native';
import { color } from '../themes';
import Feather from 'react-native-vector-icons/Feather';
import products from '../services/productService';

interface ListItem {
  img: string;
  name: string;
  restaurant: string;
  price: number;
  rating: number;
}

const MenuCard = () => {

  const Dark = useColorScheme() === 'dark';
  const [data, setData] = useState<ListItem[]>([]);
  const category = ['All', 'Spicy', 'Starter', 'Pizza', 'Burger', 'Chinese', 'Beverages', 'Desserts', 'Indian'];

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await products.getAll();
        setData(res!.data);
      } catch (err) {
        console.log('Error: ', err);
      }
    };
    fetchAll();
  });

  const searchPressed = () => {console.log('Search pressed!');};

  return (
    <SafeAreaView style={{backgroundColor: Dark ? color.primaryDark : color.primaryLight}}>
      {/* SearchBar */}
      <View className = "flex-row mx-5 my-2 rounded-3xl" style={{backgroundColor: Dark ? color.contrastDark : color.contrastLight}} >
        <TextInput
          className = "flex-1 mx-4 h-12 text-lg"
          placeholder = "Search your favourite food"
        />
        <Pressable
          className = "items-center justify-center rounded-3xl w-14 h-12"
          style={{backgroundColor: Dark ? color.secondaryDark : color.secondaryLight}}
          onPress = {searchPressed}
        >
          <Feather name="search" size={25} color="white" />
        </Pressable>
      </View>
      {/* Horizontal Categories */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
        <View className = "flex-row m-2" >
          {category.map((item, index) => (
            <View key={index} className = "flex-col justify-center items-center m-3 rounded-2xl w-20 h-10" style={{backgroundColor: Dark ? color.secondaryDark : color.secondaryLight}} >
              <Text className = "text-base font-bold" style={{color: color.contrastLight}} >{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Scrollable Menu Items */}
      <ScrollView>
        {data.map((item, index) => (
        <View key={index} className = "flex-col items-center my-3" >
          <View
            key={index}
            className = "flex-row items-center rounded-3xl h-36 w-[90%]"
            style={{backgroundColor: Dark ? color.contrastDark : color.contrastLight}}
          >
            <Image source={{uri : item.img}} className="w-[45%] h-36 rounded-3xl" style={{resizeMode:'cover'}} />
            <View className = "flex-col ml-4" >
              <Text className = "text-lg font-bold text-red-500" >{item.name}</Text>
              <Text className = "text-base font-bold" style={{color: Dark ? color.contrastLight : color.primaryDark}} >by {item.restaurant}</Text>
              <View className="flex-row gap-5 mt-2">
                <View className="px-2 h-8 rounded-lg" style={{backgroundColor: Dark ? color.secondaryDark : color.secondaryLight}} >
                  <Text className = "text-lg font-bold text-rose-50" >₹{item.price}</Text>
                </View>
                <View className="pr-2 h-8 rounded-lg" style={{backgroundColor: Dark ? color.secondaryDark : color.secondaryLight}} >
                  <Text className = "text-lg font-bold text-rose-50" >👌{item.rating}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        ))}
        <View className="h-36" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuCard;
