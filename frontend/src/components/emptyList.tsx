/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, useColorScheme } from 'react-native';
import React from 'react';

const EmptyList = () => {
  const Dark = useColorScheme() === 'dark';
  return (
    <View className="items-center mt-12">
    <Image source={require('../../assets/empty.png')}/>
    <Text className="font-medium" style={{color: Dark ? 'white' : 'black'}}>
    Oops! List is Empty</Text>
  </View>
  );
};

export default EmptyList;
