import { View, Text, Image, ActivityIndicator } from 'react-native'
import { React, useEffect } from 'react'
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const splash = () => {
  
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    delay(4000).then(() => {
      AsyncStorage.getItem('authtoken').then((value) => {
        if (value !== null) {
          router.replace('/screens/home');
        } else {
          router.replace('/screens/login');
        }
      });
    }).catch((err) => { console.error(err); });
  }, []);

  return (
    <View className = "flex-col items-center justify-center bg-red-100 h-full" >
      <Image className = "w-28 h-28 m-2" source = {require("../../assets/splash.gif")} />
      <Text className = "text-xl font-bold" >CraveMate</Text>
      <ActivityIndicator className = "mt-12" size = "large" color = "#EF4444" />
    </View>
  )
}

export default splash