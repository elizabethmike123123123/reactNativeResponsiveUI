import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../pages/auth/Login';
import OTP from '../pages/auth/OTP';
import Register from '../pages/auth/Register';

const RegisterNav = () => {
  const Stack = createNativeStackNavigator();

  const navTheme = DefaultTheme;
  navTheme.colors.background = '#fff';
  navTheme.colors.text = 'black';

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Register"
          component={Register}
          options={{header: () => null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RegisterNav;
