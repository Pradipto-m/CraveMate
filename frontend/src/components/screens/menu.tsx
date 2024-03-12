/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TextInput, Pressable, useColorScheme, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAtom, useSetAtom } from 'jotai';
import { color } from '../../themes';
import Feather from 'react-native-vector-icons/Feather';
import { productAtom, fetchProducts, fetchByCategory, fetchBySearch } from '../../contexts/productStore';
import Animated, { FadeInDown } from 'react-native-reanimated';
import EmptyList from '../emptyList';

const MenuScreen = ({navigation}: any) => {

  const Dark = useColorScheme() === 'dark';
  const delay = (ms : number) => new Promise(res => setTimeout(res, ms));
  const category = ['All', 'Spicy', 'Chinese', 'Continental', 'Crispy', 'Snacks'];

  const [refresh, setRefresh] = useState(false);
  const [load, setLoad] = useState(true);
  const [products] = useAtom(productAtom);
  const fetchAll = useSetAtom(fetchProducts);
  const fetchCategory = useSetAtom(fetchByCategory);
  const fetchSearched = useSetAtom(fetchBySearch);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchAll();
    delay(1000).then(() => setLoad(false));
  }, [fetchAll, fetchCategory, fetchSearched]);

  const categoryPressed = async (genre: string) => {
    setLoad(true);
    if (genre === 'all') {
      await fetchAll();
      setLoad(false);
    }
    else { await fetchCategory(genre); setLoad(false); }
  };
  const searchPressed = async () => {
    setLoad(true);
    await fetchSearched(name);
    setLoad(false);
  };

  return (
    <SafeAreaView style={{backgroundColor: Dark ? color.primaryDark : color.primaryLight, minHeight: '100%'}}>
      {/* SearchBar */}
      <View className = "flex-row mx-5 mt-4 rounded-3xl" style={{backgroundColor: Dark ? color.contrastDark : color.contrastLight}} >
        <TextInput
          className = "flex-1 mx-4 text-lg"
          placeholder = "Search your favourite food"
          onChangeText={(text) => setName(text)}
        />
        <Pressable
          className = "items-center justify-center rounded-3xl w-[62px] h-[52px]"
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
            <Pressable
              key={index}
              className = "flex-col justify-center items-center m-3 rounded-2xl w-[84px] h-[41px]"
              style={{backgroundColor: Dark ? color.secondaryDark : color.secondaryLight}}
              onPress={() => {categoryPressed(item.toLowerCase());}}
            >
              <Text className = "text-base font-medium" style={{color: color.contrastLight}} >{item}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      {/* scrollable menu items */}
      {load ?
      <ActivityIndicator size={'large'} color={'red'} className="h-1/2 items-center justify-start" /> :
      <FlatList
        className="mb-36"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 95}}
        refreshing={refresh}
        onRefresh={() => {
          setRefresh(true); categoryPressed('all'); setRefresh(false);
        }}
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
          <Animated.View className="items-center" entering={FadeInDown.duration(600)}>
            <TouchableOpacity
              className = "flex-row items-center rounded-3xl h-36 w-[90%] mt-5"
              style={{backgroundColor: Dark ? color.contrastDark : color.contrastLight}}
              key={item._id}
              onPress={() => {
                navigation.navigate('Menucard', item._id);
              }}
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
            </TouchableOpacity>
          </Animated.View>
        )}
        ListEmptyComponent={EmptyList}
      />}
    </SafeAreaView>
  );
};

export default MenuScreen;
