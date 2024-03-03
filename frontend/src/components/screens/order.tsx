/* eslint-disable react-native/no-inline-styles */
import { View, Text, SafeAreaView, useColorScheme, ScrollView, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';
import React, { Fragment, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useStripe } from '@stripe/stripe-react-native';
import { color } from '../../themes';
import SwipeButton from 'rn-swipe-button';
import LinearGradient from 'react-native-linear-gradient';
import { userAtom } from '../../contexts/userStore';
import { cartAtom, emptyCart, itemsAtom } from '../../contexts/cartStore';
import { placeOrderAtom } from '../../contexts/ordersStore';
import orderService from '../../services/orderService';
import StatusModal from '../statusModal';

const OrderScreen = ({navigation}: any) => {

  const Dark = useColorScheme() === 'dark';
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [keyboard, setKeyboard] = useState(false);
  const [payment, setPayment] = useState(false);
  const [success, setSuccess] = useState(false);

  Keyboard.addListener('keyboardDidShow', () => {
    setKeyboard(true);
  });
  Keyboard.addListener('keyboardDidHide', () => {
    setKeyboard(false);
  });

  const [user] = useAtom(userAtom);
  const [cart] = useAtom(cartAtom);
  const [items] = useAtom(itemsAtom);
  const order = useSetAtom(placeOrderAtom);
  const updateCart = useSetAtom(emptyCart);
  const total = Math.ceil(cart?.amount * 0.05) + cart?.amount + 10;
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
    // Call the payment backend service
    const {paymentIntent} = await orderService.paymentService(total * 100)
    .catch((err) => {console.error(err); throw err;});

    // Initialize the payment sheet
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

    // Present the payment sheet and show the status modal
    await presentPaymentSheet().then( async (result) => {
      if (result.error) {
        setSuccess(false);
        setPayment(true);
        console.error('Payment failed', result.error);
      } else {
        await order(user._id, address, phone)
        .then( async () => {
          await updateCart().then(() => {
            setSuccess(true);
            setPayment(true);
            console.log('Payment and Order successful');
          }).catch((err) => console.error(err));
        })
        .catch((err) => {
          setSuccess(false);
          setPayment(true);
          console.error(err);
        });
      }
      setTimeout( async () => {
        navigation.pop();
      }, 2300);
    })
    .catch((err) => {
      console.error('Error presenting payment sheet', err);
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: Dark ? color.primaryDark : color.primaryLight, minHeight: '100%'}}>
      {payment ? <StatusModal status={success} /> :
      <>
      {/* header menu */}
      <View className="flex-row items-center justify-between mx-4 h-16" >
        <Text
        className="text-3xl font-bold text-center"
        style={{color: Dark ? color.contrastLight : color.contrastDark}}
        >Order Summary</Text>
      </View>
      <View className="h-[1.5px] mx-4 mb-8 bg-slate-700" />
      {/* Bottom payment button */}
      {!keyboard && address !== '' && phone.length === 10 ?
      <View
      className="flex-col absolute z-50 bottom-0 w-full px-4 pb-2 justify-between rounded-t-2xl"
      style={{backgroundColor: Dark ? color.contrastDark : 'rgb(248 113 113)'}}
      >
        <Text className="text-lg py-3 ml-1" style={{color: Dark ? color.contrastLight : color.primaryDark}}
        >Proceed to checkout: ₹{total}</Text>
        <SwipeButton
        title="Swipe to pay"
        height={55}
        containerStyles={{borderRadius: 30}}
        thumbIconStyles={{borderRadius: 30}}
        thumbIconWidth={70}
        thumbIconBackgroundColor={Dark ? color.contrastLight : 'rgb(248 113 113)'}
        thumbIconBorderColor={Dark ? color.contrastLight : 'rgb(248 113 113)'}
        railBackgroundColor={Dark ? 'rgb(248 113 113)' : color.contrastLight}
        railBorderColor={Dark ? 'rgb(248 113 113)' : color.contrastLight}
        railFillBackgroundColor={Dark ? color.contrastLight : 'rgb(248 113 113)'}
        railFillBorderColor={Dark ? color.contrastLight : 'rgb(248 113 113)'}
        onSwipeSuccess={initiatePay}
        />
      </View>
      : <></>}

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
            {items?.map((item, i) => (
              <View key={i} className="flex-row p-2">
                <Text
                className="flex-1 text-xl"
                style={{color: Dark ? color.contrastLight : color.primaryDark}}
                >• {item.name} x {cart?.products[i]?.quantity}</Text>
                <Text
                className="text-xl font-bold pl-2"
                style={{color: Dark ? color.contrastLight : color.primaryDark}}
                >₹{item.price * cart?.products[i]?.quantity}</Text>
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
              >₹{cart?.amount}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-xl mt-5" style={{color: Dark ? color.contrastLight : color.primaryDark}}>5% GST:</Text>
              <Text
              className="text-2xl font-bold mt-5"
              style={{color: Dark ? color.contrastLight : color.primaryDark}}
              >₹{Math.ceil(cart?.amount * 0.05) + cart?.amount}</Text>
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
          <View className="flex-row h-0.5 mt-9">
            {Array(25).fill(0).map((_, i) => (
              <Fragment key={i}>
              <View className="w-2 bg-gray-500"/>
              <View className="w-2" style={{backgroundColor: Dark ? color.primaryDark : color.primaryLight}}/>
              </Fragment>
            ))}
          </View>
          <View className="flex-row items-center justify-between mt-9" >
            <Text
            className="text-3xl font-bold text-center"
            style={{color: Dark ? color.contrastLight : color.contrastDark}}
            >Billing Details:</Text>
          </View>
          <View className="h-[1.5px] my-4 bg-slate-700" />
          <KeyboardAvoidingView>
            <Text className="text-xl font-semibold" style={{color: Dark ? color.contrastLight : color.primaryDark}}>Address:</Text>
            <View
            className = "my-4 rounded-xl"
            style={{borderWidth: 1.5, borderColor: color.contrastDark}}
            >
              <TextInput
              className="pl-3 text-lg"
              multiline={true}
              placeholder="Address"
              value={address}
              onChangeText={text => setAddress(text)}
              />
            </View>
            <Text className="text-xl font-semibold" style={{color: Dark ? color.contrastLight : color.primaryDark}}>Contact:</Text>
            <View
            className = "flex-row my-4 rounded-xl"
            style={{borderWidth: 1.5, borderColor: color.contrastDark}}
            >
              <Text className="text-lg font-semibold p-3" style={{color: Dark ? color.contrastLight : color.primaryDark}}>+91</Text>
              <TextInput
              className = "pl-1 text-lg"
              placeholder="mobile number"
              value={phone}
              onChangeText={text => setPhone(text)}
              />
            </View>
          </KeyboardAvoidingView>
          <View className="h-36" />
        </View>
      </ScrollView>
      </>}
    </SafeAreaView>
  );
};

export default OrderScreen;
