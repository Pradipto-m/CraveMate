/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, useColorScheme, Image, Pressable, Alert, ScrollView } from 'react-native';
import { color } from '../../themes';
import { useAtom, useSetAtom } from 'jotai';
import { logoutAtom, userAtom } from '../../contexts/userStore';
import { fetchUserOrders, orderAtom } from '../../contexts/ordersStore';
import EmptyList from '../emptyList';

const ProfileSection = ({navigation} : any) => {

  const Dark = useColorScheme() === 'dark';
  const [user] = useAtom(userAtom);
  const [orders] = useAtom(orderAtom);
  const fetchOrders = useSetAtom(fetchUserOrders);
  const logoutUser = useSetAtom(logoutAtom);

  useEffect(() => {
    const getOrders = async () => {
      await fetchOrders(user._id);
    };
    getOrders();
  });

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
        style={{color: Dark ? color.contrastLight : color.contrastDark}}
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

      {/* User's orders status */}
      <View className="items-center mt-14">
        <Text className="text-[27.5px] font-bold" style={{color: Dark ? color.contrastLight : color.contrastDark}}>Your Orders:</Text>
      </View>
      <View className="h-[1.5px] mx-4 mt-6 bg-slate-700" />
      {/* Scrollable orders list */}
      <ScrollView showsVerticalScrollIndicator={true} style={{flex: 1}}>
        <View>
        {orders?.length === 0 ? < EmptyList /> :
        orders?.map((order, index) => (
          <View key={index} className="flex-col mx-6 mt-8">
          <View className="flex-col items-start rounded-t-2xl p-2" style={{backgroundColor: Dark ? color.contrastDark : color.contrastLight}}>
            {order.products.map((product, id) => (
              <Text key={id} className="text-lg font-semibold" style={{color: Dark ? color.contrastLight : color.primaryDark}}>• {product.itemName} x {product.quantity}</Text>
            ))}
            <Text style={{color: Dark ? color.contrastLight : color.primaryDark}}> {new Date(order.date).toDateString()}</Text>
          </View>
          <View className="items-start mt-0.5 py-2 px-3 rounded-b-2xl bg-red-400">
            <Text className="text-slate-900 text-lg font-semibold">amount paid: ₹{order.amount}</Text>
            <Text className="text-slate-900">package status: {order.status}</Text>
            <Text className="text-slate-900">expected delivery within: 3 hours</Text>
          </View>
        </View>
        ))}
        </View>
        <View className="h-24"/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSection;
