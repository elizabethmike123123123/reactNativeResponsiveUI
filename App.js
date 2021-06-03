import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Nav from './Navigation/route';
import {NavigationContainer} from '@react-navigation/native';

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Nav/>
      </NavigationContainer>
    );
  }
}

export default App;
