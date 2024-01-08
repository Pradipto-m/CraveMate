import { View, Text, Image, ActivityIndicator, Alert } from 'react-native'
import { React, useEffect } from 'react'
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/authService';

const splash = () => {
  
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    delay(4000).then(() => {
      AsyncStorage.getItem('authtoken').then((value) => {
        if (value !== null) {
          // User is already signed in...Fetching data
          authService.fetchUser().then((res) => {
            if (res.status >= 200 && res.status < 300) {
              router.replace('/screens/home');
            } else {
              // User authorisation failed
              router.replace('/screens/login');
              Alert.alert('Error', 'Something went wrong! Please sign in again.');
            }
          }).catch((err) => {
            router.replace('/screens/login');
            Alert.alert('Error', `${err.message}! Please sign in again.`);
          });
        } else {
          router.replace('/screens/login');
        }
      });
    }).catch((err) => { console.error(err); });
  });

  return (
    <View className = "flex-col items-center justify-center bg-red-100 h-full" >
      <Image className = "w-28 h-28 m-2" source = {require("../../assets/splash.gif")} />
      <Text className = "text-xl font-bold" >CraveMate</Text>
      <ActivityIndicator className = "mt-12" size = "large" color = "#EF4444" />
    </View>
  )
}

export default splash;