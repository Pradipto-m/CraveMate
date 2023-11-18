import { React, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const signup = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView className = "flex-1 bg-red-100 items-center" >
      {/* Pizza image */}
      <View>
        <Image className = "w-[410px] h-[215px]" source = {require("../../assets/pizza.png")} />
      </View>
      {/* Signup form */}
      <KeyboardAvoidingView>
        <View>
          <Text className = "text-2xl my-10 font-bold text-center text-black">Sign up for your Cravings Partner!</Text>
        </View>
        {/* Text inputs */}
        <View className = "flex-col mx-4" >
          {/* Username */}
          <View className = "flex-row items-center my-3 px-4 bg-red-50 rounded-2xl" >
            <AntDesign name = "user" size = {24} color = "black" />
            <TextInput
            className = "ml-3 h-12 text-lg border-black"
            placeholder='Username'
            onChangeText={text => setUsername(text)}
            ></ TextInput>
          </View>
          {/* Email */}
          <View className = "flex-row items-center my-3 px-4 bg-red-50 rounded-2xl" >
            <AntDesign name = "mail" size = {24} color = "black" />
            <TextInput
            className = "ml-3 h-12 text-lg border-black"
            placeholder='Email'
            onChangeText={text => setEmail(text)}
            ></ TextInput>
          </View>
          {/* Password */}
          <View className = "flex-row items-center my-3 px-4 bg-red-50 rounded-2xl" >
            <AntDesign name = "lock" size = {24} color = "black" />
            <TextInput
            className = "ml-3 h-12 text-lg border-black"
            placeholder='Password'
            secureTextEntry = {true}
            onChangeText={text => setPassword(text)}
            ></ TextInput>
          </View>
          {/* Button */}
          <Pressable className = "flex-col items-center justify-center mt-12 h-12 bg-red-500 rounded-2xl" >
            <Text className = "text-white text-lg font-bold" >Sign Up</Text>
          </Pressable>
          <Pressable className = "flex-row items-center justify-center mt-4" onPress={() => router.replace("/screens/login")} >
            <Text className = "text-gray-700 font-bold mr-0.5" >Already have an account?</Text>
            <Text className = "text-red-500 font-bold ml-0.5" >Login</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default signup