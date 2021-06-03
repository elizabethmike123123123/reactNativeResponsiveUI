// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Dimension from '../screens/dimensions';
import Responsive from '../screens/responsive';

const Stack = createStackNavigator();

export default function Nav() {
  return (
    <Stack.Navigator initialRouteName={Responsive}>
      <Stack.Screen
        name="Dimension"
        component={Dimension}
        options={{
          title: 'My Dimension',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Responsive"
        component={Responsive}
        options={{
          title: 'My Responsive',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}
