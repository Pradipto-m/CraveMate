/* eslint-disable react-native/no-inline-styles */
import { View, Text, useColorScheme, Image } from 'react-native';
import React from 'react';
import { color } from '../themes';
import Feather from 'react-native-vector-icons/Feather';

const AddonItems = (addonitem: any) => {
  const Dark = useColorScheme() === 'dark';
  return (
    <View className="flex-row justify-between items-center">
      <Image source={{uri: addonitem.img}} className="w-20 h-20 rounded-full"/>
      <Text className="flex-1 mx-2" style={{color: Dark ? color.contrastLight : color.primaryDark, lineHeight: 17}}>{addonitem.name}</Text>
      <View
      className="flex-row justify-center items-center h-20 w-20 rounded-full"
      style={{backgroundColor: Dark ? color.secondaryDark : color.secondaryLight}}
      >
        <Feather name="plus" size={26} color={'white'}/>
      </View>
    </View>
  );
};

export default AddonItems;
