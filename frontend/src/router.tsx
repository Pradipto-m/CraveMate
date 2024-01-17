
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashOnboard from './auth/splash';
import LoginScreen from './auth/login';
import SignupScreen from './auth/signup';
import TabRoutes from './bottomTabs';

const Router = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Splash" component={SplashOnboard} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Tabs" component={TabRoutes} />
    </Stack.Navigator>
  );
};

export default Router;
