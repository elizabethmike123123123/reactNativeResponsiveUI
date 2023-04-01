import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ManualLocation from '../pages/location/ManualLocation';
import SelectLocation from '../pages/location/SelectLocation';

const LocationStack = () => {
  const Stack = createNativeStackNavigator();
  const navTheme = DefaultTheme;
  navTheme.colors.background = '#fff';
  navTheme.colors.text = "black";
  
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="SelectLocation">
        <Stack.Screen
          name="SelectLocation"
          component={SelectLocation}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="ManualLocation"
          component={ManualLocation}
          options={{header: () => null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LocationStack;
