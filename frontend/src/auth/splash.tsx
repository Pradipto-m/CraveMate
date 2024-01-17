import {View, Text, Image, ActivityIndicator, Alert, useColorScheme} from 'react-native';
import React, { useEffect } from 'react';
import {color} from '../themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/authService';

const SplashOnboard = ({navigation}: any) => {
  const Dark = useColorScheme() === 'dark';
  const delay = (ms : number) => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    delay(2000).then(() => {
      AsyncStorage.getItem('authtoken').then(value => {
        if (value !== null) {
          // User is already signed in...Fetching data
          authService.fetchUser().then(res => {
            if (res.status >= 200 && res.status < 300) {
              navigation.replace('Tabs');
            } else {
              // User authorisation failed
              navigation.replace('Login');
              Alert.alert('Error', 'Something went wrong! Please sign in again.');
            }
          }).catch(err => {
            navigation.replace('Login');
            Alert.alert('Error', `${err.message}! Please sign in again.`);
          });
        } else {
          navigation.replace('Login');
        }
      });
    }).catch(err => {
      console.error(err);
    });
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
