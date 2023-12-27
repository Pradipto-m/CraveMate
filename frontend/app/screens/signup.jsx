import { React, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import authService from '../services/authService';

const signup = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signupPressed = async () => {
    setLoading(true);
  
    // FormData validations
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(username === '' || email === '' || password === '') {
      Alert.alert("Error", "Please fill in all the fields!");
      setLoading(false);
      return;
    }
    else if(username.length < 3) {
      Alert.alert("Error", "Username must be at least 3 characters!");
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

    // Signup api response
    try {
      let res = await authService.signup(username, email, password);
      if (res.status >= 200 && res.status < 300) {
        // Signing up user is successful
        Alert.alert("Success", "User successfully signed up!");
        // Logging user in automatically for auth token
        authService.login(email, password).then((res) => {
          if (res.status >= 200 && res.status < 300) {
            // User is successfully authenticated
            router.replace("/screens/home");
          } else {
            Alert.alert("Error", "Something went wrong! Please sign in.");
          }
        }).catch((err) => {
          console.error(err);
        });
      } else {
        Alert.alert("Error", "User already exists!");
      }
    } catch (err) {
      console.error(err);
    }
  
    setUsername('');
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
          <Text className = "text-2xl my-10 font-bold text-center text-black">Sign up for your Cravings Partner!</Text>
        </View>
        {/* Text inputs */}
        <View className = "flex-col mx-4" >
          {/* Username */}
          <View className = "flex-row items-center my-3 px-4 bg-red-50 rounded-2xl" >
            <AntDesign name = "user" size = {24} color = "black" />
            <TextInput
            className = "ml-3 h-12 text-lg border-black"
            value={username}
            placeholder='Username'
            onChangeText={text => setUsername(text)}
            ></ TextInput>
          </View>
          {/* Email */}
          <View className = "flex-row items-center my-3 px-4 bg-red-50 rounded-2xl" >
            <AntDesign name = "mail" size = {24} color = "black" />
            <TextInput
            className = "ml-3 h-12 text-lg border-black"
            value={email}
            placeholder='Email'
            onChangeText = {text => setEmail(text)}
            ></ TextInput>
          </View>
          {/* Password */}
          <View className = "flex-row items-center my-3 px-4 bg-red-50 rounded-2xl" >
            <AntDesign name = "lock" size = {24} color = "black" />
            <TextInput
            className = "ml-3 h-12 text-lg border-black"
            placeholder='Password'
            value={password}
            secureTextEntry={true}
            onChangeText = {text => setPassword(text)}
            ></ TextInput>
          </View>
          {/* Button */}
          <Pressable
          className = "flex-col items-center justify-center mt-12 h-12 rounded-2xl"
          style = {{backgroundColor: loading ? "#FEE2E2" : "#EF4444"}}
          onPress={signupPressed}
          disabled={loading}
          >
            <Text className = "text-red text-lg font-bold" style={{color: loading ? "#FEE2E2" : "#FEF2F2"}} >Sign Up</Text>
          </Pressable>
          <Pressable className = "flex-row items-center justify-center my-4" onPress={() => router.replace("/screens/login")} >
            <Text className = "text-gray-700 font-bold mr-0.5" >Already have an account?</Text>
            <Text className = "text-red-500 font-bold ml-0.5" >Login</Text>
          </Pressable>
          <ActivityIndicator size="large" animating = {loading} color = "#EF4444" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default signup