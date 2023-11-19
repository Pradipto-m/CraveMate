import { React, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import authService from '../services/authService';

const login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginPressed = async () => {
    setLoading(true);

    // FormData validations
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email === '' || password === '') {
      Alert.alert("Error", "Please fill in all the fields!");
      setLoading(false);
      return;
    }
    else if(password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters!");
      setLoading(false);
      return;
    }
    else if(!regex.test(email)) {
      Alert.alert("Error", "Email Invalid!");
      setLoading(false);
      return;
    }
  
    // Login api response
    try {
      let res = await authService.login(email, password);

      if (res.status >= 200 && res.status < 300) {
        Alert.alert("Success", "User logged in successfully!");
      } else {
        Alert.alert("Error", "User doesn't exist!");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong!");
    }

    setEmail('');
    setPassword('');
    setLoading(false);
  }

  return (
    <SafeAreaView className = "flex-1 bg-red-100 items-center" >
      {/* Pizza image */}
      <View>
        <Image className = "w-[410px] h-[215px]" source = {require("../../assets/pizza.png")} />
      </View>
      {/* Signup form */}
      <KeyboardAvoidingView>
        <View>
          <Text className = "text-[27px] my-10 font-bold text-center text-black">Sign in to the World of YUM!</Text>
        </View>
        {/* Text inputs */}
        <View className = "flex-col mx-2" >
          {/* Email */}
          <View className = "flex-row items-center my-3 px-4 bg-red-50 rounded-2xl" >
            <AntDesign name = "mail" size = {24} color = "black" />
            <TextInput
            className = "ml-3 h-12 text-lg border-black"
            placeholder='Email'
            value={email}
            onChangeText={text => setEmail(text)}
            ></ TextInput>
          </View>
          {/* Password */}
          <View className = "flex-row items-center my-3 px-4 bg-red-50 rounded-2xl" >
            <AntDesign name = "lock" size = {24} color = "black" />
            <TextInput
            className = "ml-3 h-12 text-lg border-black"
            placeholder='Password'
            value={password}
            secureTextEntry = {true}
            onChangeText={text => setPassword(text)}
            ></ TextInput>
          </View>
          {/* Button */}
          <Pressable
          className = "flex-col items-center justify-center mt-12 h-12 rounded-2xl"
          style = {{backgroundColor: loading ? "#FEE2E2" : "#EF4444"}}
          onPress={loginPressed}
          disabled={loading}
          >
            <Text className = "text-lg font-bold" style={{color: loading ? "#FEE2E2" : "#FEF2F2"}} >Login</Text>
          </Pressable>
          <Pressable className = "flex-row items-center justify-center my-4" onPress={() => router.replace("/screens/signup")} >
            <Text className = "text-gray-700 font-bold mr-0.5" >Don't have an account?</Text>
            <Text className = "text-red-500 font-bold ml-0.5" >Signup</Text>
          </Pressable>
          <ActivityIndicator size="large" animating = {loading} color = "#EF4444" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default login