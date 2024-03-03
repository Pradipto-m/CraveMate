/* eslint-disable react-native/no-inline-styles */
import { View, Text, ImageBackground, useColorScheme } from 'react-native';
import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { color } from '../themes';

const StatusModal = ({status}: {status: boolean}) => {
  const Dark = useColorScheme() === 'dark';
  const animation = useRef<LottieView>(null);
  useEffect(() => {
    status ?
    animation.current?.play(10, 100) :
    animation.current?.play(0, 100);
  }, [status]);
  return (
    <View>
      <ImageBackground
      source={Dark ? require('../../assets/darkBg.jpg')
      : require('../../assets/lightBg.jpg')}
      style={{height: '100%', width: '100%'}}
      resizeMode="cover"
      blurRadius={8}
      >
        <View className="h-full items-center justify-center">
          <View className="items-center justify-center rounded-[45px]" style={{backgroundColor: Dark ? color.bottomTabsDark : color.bottomTabsLight}}>
            <LottieView
            source={status ? require('../../assets/success.json')
            : require('../../assets/error.json')}
            style={{height: 250, width: 250}}
            ref={animation}
            autoPlay={true}
            loop={false}
            />
            {status ?
            <View className="justify-center items-center">
              <Text className="font-semibold text-xl" style={{color: Dark ? color.contrastLight : color.primaryDark}}>Congratulations!</Text>
              <Text className="font-semibold text-xl px-3 pb-3" style={{color: Dark ? color.contrastLight : color.primaryDark}}>Your order have been successfully placed.</Text>
            </View> :
            <View className="justify-center items-center">
            <Text className="font-semibold text-xl" style={{color: Dark ? color.contrastLight : color.primaryDark}}>Oops!</Text>
            <Text className="font-semibold text-xl px-9 pb-3" style={{color: Dark ? color.contrastLight : color.primaryDark}}>Your order couldn't be placed.</Text>
          </View>}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default StatusModal;
