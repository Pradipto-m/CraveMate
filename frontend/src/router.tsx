import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashOnboard from './auth/splash';
import LoginScreen from './auth/login';
import SignupScreen from './auth/signup';
import MenuCard from './components/card';
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
      <Stack.Screen name="Menucard"
        component={MenuCard}
        options={{
          animation: 'slide_from_bottom',
          statusBarHidden: true,
          statusBarTranslucent: true,
          statusBarColor: 'transparent',
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
