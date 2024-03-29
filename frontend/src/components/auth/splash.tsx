/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Alert, useColorScheme, ToastAndroid} from 'react-native';
import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import {color} from '../../themes';
import { fetchUser } from '../../contexts/userStore';
import LottieView from 'lottie-react-native';

const SplashOnboard = ({navigation}: any) => {
  // const delay = (ms : number) => new Promise(res => setTimeout(res, ms));
  const Dark = useColorScheme() === 'dark';
  const fetchUserAtom = useSetAtom(fetchUser);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await fetchUserAtom();
        navigation.replace('Tabs');
        ToastAndroid.show('User logged in successfully!', ToastAndroid.SHORT);
      } catch (err) {
        console.error(err);
        Alert.alert('Error', `${err}!\nPlease sign in.`);
        navigation.replace('Login');
      }
    };
    setTimeout(fetchUserData, 1100);
  });

  return (
    <View
      className="flex-col items-center justify-center h-full"
      style={{backgroundColor: Dark ? color.primaryDark : color.primaryLight}}>
      <Image
        className="w-32 h-40 mb-4"
        source={require('../../../assets/splash.png')}
      />
      <Text
        className="text-xl font-bold"
        style={{color: Dark ? color.contrastLight : color.primaryDark}}>
        CraveMate
      </Text>
      <LottieView
      source={require('../../../assets/loader.json')}
      style={{width: 250, height: 250, marginBottom: -20}}
      autoPlay
      loop
      />
    </View>
  );
};

export default SplashOnboard;
