import {View, Text, Image, ActivityIndicator, Alert, useColorScheme} from 'react-native';
import React, { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import {color} from '../themes';
import { fetchUser } from '../contexts/userStore';

const SplashOnboard = ({navigation}: any) => {
  // const delay = (ms : number) => new Promise(res => setTimeout(res, ms));
  const Dark = useColorScheme() === 'dark';
  const fetchUserAtom = useSetAtom(fetchUser);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await fetchUserAtom();
        navigation.replace('Tabs');
        // Alert.alert('Success', 'User Authorisation Successful!');
      } catch (err) {
        console.error(err);
        Alert.alert('Error', `${err}!\nPlease sign in.`);
        navigation.replace('Login');
      }
    };
    setTimeout(fetchUserData, 1250);
  });

  return (
    <View
      className="flex-col items-center justify-center h-full"
      style={{backgroundColor: Dark ? color.primaryDark : color.primaryLight}}>
      <Image
        className="w-32 h-40 mb-4"
        source={require('../../assets/splash.png')}
      />
      <Text
        className="text-xl font-bold"
        style={{color: Dark ? color.contrastLight : color.primaryDark}}>
        CraveMate
      </Text>
      <ActivityIndicator
        className="mt-12"
        size="large"
        color={color.secondaryLight}
      />
    </View>
  );
};

export default SplashOnboard;
