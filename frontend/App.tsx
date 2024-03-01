import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/router';
import { StripeProvider } from '@stripe/stripe-react-native';

const stripe_key = 'pk_test_51OnJtoSD1JnNXPoDTY9WS0nfluSkU74znpvYJufxiDyONmYVepkXmqZwdrPuUjEwutB1jl926ej3kkhNtSj36VC8004Pk38cbg';

const App = () => {
  return (
    <StripeProvider publishableKey={stripe_key}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;
