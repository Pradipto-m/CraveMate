/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, SafeAreaView, useColorScheme, Image, Pressable, Alert } from 'react-native';
import { color } from '../../themes';
import { useAtom, useSetAtom } from 'jotai';
import { logoutAtom, userAtom } from '../../contexts/userStore';

const ProfileSection = ({navigation} : any) => {

  const Dark = useColorScheme() === 'dark';
  const [user] = useAtom(userAtom);
  const logoutUser = useSetAtom(logoutAtom);

  const logout = () => {
    logoutUser();
    navigation.navigate('Splash');
  };

  return (
    <SafeAreaView style={{backgroundColor: Dark ? color.primaryDark : color.primaryLight, minHeight: '100%'}}>
      {/* header menu */}
      <View className="flex-row items-center justify-between mx-4 h-16" >
        <Text
        className="text-3xl font-bold text-center"
        style={{color: Dark ? color.contrastLight : color.primaryDark}}
        >Hi Foodie,</Text>
        <Pressable
          onPress={() => Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [{text:'cancel', style:'cancel'},
            {text: 'Logout', onPress: logout}]
          )}
        >
          <Text style={{color: color.secondaryDark, fontSize:15}}>Logout</Text>
        </Pressable>
      </View>
      <View className="h-[1.5px] mx-4 bg-slate-700" />
      {/* user profile */}
      <View className="flex-row items-center" >
        <Image source={require('../../../assets/userprofile.png')} className="w-32 h-32 mx-7 my-3" />
        <View className="flex-col" >
          <Text className="text-xl font-bold ml-5" style={{color: Dark ? color.contrastLight : color.primaryDark}}>{user.username}</Text>
          <Text className="text-xl font-bold ml-5" style={{color: Dark ? color.contrastLight : color.primaryDark}}>{user.email}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileSection;
