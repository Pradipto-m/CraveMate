/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, useColorScheme, ScrollView, Pressable, Alert } from 'react-native';
import React, { Fragment } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useStripe } from '@stripe/stripe-react-native';
import { color } from '../../themes';
import LinearGradient from 'react-native-linear-gradient';
import { userAtom } from '../../contexts/userStore';
import { cartAtom, itemsAtom } from '../../contexts/cartStore';
import { placeOrderAtom } from '../../contexts/ordersStore';
import orderService from '../../services/orderService';

const OrderScreen = ({navigation}: any) => {

  const Dark = useColorScheme() === 'dark';
  const [user] = useAtom(userAtom);
  const [cart] = useAtom(cartAtom);
  const [items] = useAtom(itemsAtom);
  const order = useSetAtom(placeOrderAtom);
  const total = Math.ceil(cart.amount * 0.05) + cart.amount + 10;
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const customStyling = {
    shapes: {
      borderRadius: 14,
      borderWidth: 0.5,
    },
    primaryButton: {
      shapes: {
       borderRadius: 16,
      },
    },
    colors: {
      primary: '#ef4444',
    },
  };

  const initiatePay = async () => {
    const {paymentIntent} = await orderService.paymentService(total * 100)
    .catch((err) => {console.error(err); throw err;});

    await initPaymentSheet({
      merchantDisplayName: 'CraveMate',
      paymentIntentClientSecret: paymentIntent,
      appearance: customStyling,
      defaultBillingDetails: {
        name: user.username,
        address: {country: 'IN'},
      },
    }).catch((err) => {
      console.error('Error initializing payment sheet', err);
    });

    await presentPaymentSheet().then( async (result) => {
      if (result.error) {
        Alert.alert('Payment failed', result.error.message);
        console.error('Payment failed', result.error);
      } else {
        console.log('Payment successful', result);
        await order(user._id, 'ABC, Kolkata', '1234567890')
        .then(() => {
          Alert.alert('Success', 'Order successful');
        })
        .catch((err) => {
          console.error(err);
          Alert.alert('Error', `${err}!\nPlease try again.`);
        });
      }
      setTimeout( async () => {
        navigation.pop();
      }, 1800);
    })
    .catch((err) => {
      console.error('Error presenting payment sheet', err);
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: Dark ? color.primaryDark : color.primaryLight, minHeight: '100%'}}>
      {/* header menu */}
      <View className="flex-row items-center justify-between mx-4 h-16" >
        <Text
        className="text-3xl font-bold text-center"
        style={{color: Dark ? color.contrastLight : color.contrastDark}}
        >Order Summary</Text>
      </View>
      <View className="h-[1.5px] mx-4 mb-8 bg-slate-700" />
      {/* Bottom payment button */}
      <View
      className="flex-col absolute z-50 bottom-0 w-full justify-between rounded-t-2xl"
      style={{backgroundColor: Dark ? color.contrastDark : 'rgb(248 113 113)'}}
      >
        <Text className="text-lg p-4" style={{color: Dark ? color.contrastLight : color.primaryDark}}
        >Proceed to checkout: ₹{total}</Text>
        <Pressable className="bg-red-400 mx-4 mb-4 rounded-xl" onPress={initiatePay}>
          <Text className="text-2xl font-bold text-center py-2" style={{color: color.primaryLight}}
          >Pay Now</Text>
        </Pressable>
      </View>

      {/* Scrollable bill */}
      <ScrollView className="flex-1">
        <View className="mx-5">
          <LinearGradient
          colors={Dark ? [
            'rgba(65, 78, 90, 1)',
            'rgba(65, 78, 90, 0.8)',
            'rgba(65, 78, 90, 0.4)',
            'rgba(65, 78, 90, 0)',
          ] : [
            'rgba(255, 230, 230, 1)',
            'rgba(255, 230, 230, 0.85)',
            'rgba(255, 230, 230, 0.6)',
            'rgba(255, 230, 230, 0.1)',
          ]}
          className="rounded-2xl"
          >
            {items.map((item, i) => (
              <View key={i} className="flex-row p-2">
                <Text
                className="flex-1 text-xl"
                style={{color: Dark ? color.contrastLight : color.primaryDark}}
                >• {item.name} x {cart.products[i].quantity}</Text>
                <Text
                className="text-xl font-bold pl-2"
                style={{color: Dark ? color.contrastLight : color.primaryDark}}
                >₹{item.price * cart.products[i].quantity}</Text>
              </View>
            ))}
          </LinearGradient>
          <View className="flex-row h-0.5 mt-6">
            {Array(25).fill(0).map((_, i) => (
              <Fragment key={i}>
              <View className="w-2 bg-gray-500"/>
              <View className="w-2" style={{backgroundColor: Dark ? color.primaryDark : color.primaryLight}}/>
              </Fragment>
            ))}
          </View>
          <View className="mt-5">
            <View className="flex-row justify-between">
              <Text className="text-xl mt-5" style={{color: Dark ? color.contrastLight : color.primaryDark}}>Sub Total:</Text>
              <Text
              className="text-2xl font-bold mt-5"
              style={{color: Dark ? color.contrastLight : color.primaryDark}}
              >₹{cart.amount}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-xl mt-5" style={{color: Dark ? color.contrastLight : color.primaryDark}}>5% GST:</Text>
              <Text
              className="text-2xl font-bold mt-5"
              style={{color: Dark ? color.contrastLight : color.primaryDark}}
              >₹{Math.ceil(cart.amount * 0.05) + cart.amount}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-xl mt-5" style={{color: Dark ? color.contrastLight : color.primaryDark}}>Delivery Charges:</Text>
              <Text className="text-2xl font-bold mt-5" style={{color: Dark ? color.contrastLight : color.primaryDark}}>₹10</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-xl mt-5" style={{color: Dark ? color.contrastLight : color.primaryDark}}>Grand Total:</Text>
              <Text className="text-2xl font-bold mt-5" style={{color: Dark ? color.contrastLight : color.primaryDark}}>₹{total}</Text>
            </View>
          </View>
          <View className="h-36" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderScreen;
