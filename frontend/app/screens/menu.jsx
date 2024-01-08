import { React, useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TextInput, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { products } from '../services/productService';

const menu = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await products.getAll();
        setData(res.data);
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    fetchAll();
  });

  const category = ["All", "Spicy", "Starter", "Pizza", "Burger", "Chinese", "Beverages", "Desserts", "Indian"];
  const searchPressed = () => {console.log("Search pressed!");}

  return (
    <SafeAreaView className="bg-white h-full">
      {/* SearchBar */}
      <View className = "flex-row mx-5 my-2 rounded-3xl bg-red-100" >
        <TextInput
          className = "flex-1 mx-4 h-12 text-lg"
          placeholder = "Search your favourite food"
        />
        <Pressable
          className = "items-center justify-center bg-red-500 rounded-3xl w-14 h-12"
          onPress = {searchPressed}
        >
          <Feather name="search" size={25} color="white" />
        </Pressable>
      </View>
      {/* Horizontal Categories */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
        <View className = "flex-row m-2" >
          {category.map((item, index) => (
            <View key={index} className = "flex-col justify-center items-center m-3 bg-red-500 rounded-2xl w-20 h-10" >
              <Text className = "text-base font-bold text-red-50" >{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Scrollable Menu Items */}
      <ScrollView>
        {data.map((item, index) => (
        <View key={index} className = "flex-col items-center my-3" >
          <View key={index} className = "flex-row items-center rounded-3xl h-36 w-[90%] bg-red-100" >
            <Image source={{uri : item.img}} className="w-[45%] h-36 rounded-3xl" style={{resizeMode:'cover'}} />
            <View className = "flex-col ml-4" >
              <Text className = "text-lg font-bold text-red-500" >{item.name}</Text>
              <Text className = "text-base font-bold" >by {item.restaurant}</Text>
              <View className="flex-row gap-5 mt-2">
                <View className="px-2 h-8 rounded-lg bg-red-500">
                  <Text className = "text-lg font-bold text-red-50" >₹{item.price}</Text>
                </View>
                <View className="pr-2 h-8 rounded-lg bg-red-500">
                  <Text className = "text-lg font-bold text-red-50" >👌{item.rating}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default menu;