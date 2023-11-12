import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

const index = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-base">Open up app folder to start working on your expo app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default index
