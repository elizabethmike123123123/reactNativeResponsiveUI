import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../pages/auth/Login';
import OTP from '../pages/auth/OTP';
import Register from '../pages/auth/Register';

const AuthNav = () => {
  const Stack = createNativeStackNavigator();

  const navTheme = DefaultTheme;
  navTheme.colors.background = '#fff';
  navTheme.colors.text = 'black';

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{header: () => null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNav;
